extern crate ring;

use chacha20poly1305::aead::{generic_array::GenericArray, Aead, NewAead};
use chacha20poly1305::{ChaCha20Poly1305, Key, Nonce}; // Or `XChaCha20Poly1305`
use rand::prelude::*;
use rand_chacha::ChaCha20Rng;

use crate::protos::models::{Auction, Auction_AuctionType, Bids};
use protobuf::text_format;
use protobuf::Message;

pub fn generate_auction_key() -> Key {
    let mut rng = ChaCha20Rng::from_entropy();

    let n2: [u8; 32] = rng.gen();

    let key = Key::from_slice(&n2);

    *key
}

pub fn generate_nonce(auctionId: &str) -> Nonce {
    let mut rng = ChaCha20Rng::from_entropy();
    let uniqueNonce: [u8; 12] = rng.gen();
    let nonce = Nonce::from_slice(&uniqueNonce); // 12-bytes; unique per message
    *nonce
}

pub fn encrypt_auction(auction: Auction, key: &Key, nonce: &Nonce) -> Auction {
    let mut encryptedAcution = Auction::new();
    encryptedAcution.id = auction.id;
    encryptedAcution.auctionId = auction.auctionId;
    encryptedAcution.auctionType = auction.auctionType;

    let cipher = ChaCha20Poly1305::new(key);

    let mut bids: Vec<Bids> = auction
        .bids
        .into_iter()
        .map(|bid| {
            let mut encryptedBid = Bids::new();

            let bytes = bid.write_to_bytes().unwrap();
            let enc: Vec<u8> = cipher.encrypt(nonce, bytes.as_ref()).unwrap();

            encryptedBid.enc_arr = enc;
            encryptedBid
        })
        .collect();

    for bid in bids.into_iter() {
        encryptedAcution.bids.push(bid)
    }

    encryptedAcution
}

pub fn decrypt_auction(auction: Auction, key: &Key, nonce: &Nonce) -> Auction {
    let mut encryptedAcution = Auction::new();
    encryptedAcution.id = auction.id;
    encryptedAcution.auctionId = auction.auctionId;
    encryptedAcution.auctionType = auction.auctionType;

    let cipher = ChaCha20Poly1305::new(key);

    let mut bids: Vec<Bids> = auction
        .bids
        .into_iter()
        .map(|bid| {
            let bytes = bid.write_to_bytes().unwrap();
            let enc = cipher.decrypt(nonce, bid.enc_arr.as_ref()).unwrap();

            let mut newBid = Bids::new();

            let bid = Bids::merge_from_bytes(&mut newBid, &enc);

            newBid
        })
        .collect();

    for bid in bids.into_iter() {
        encryptedAcution.bids.push(bid)
    }

    encryptedAcution
}

#[cfg(test)]
mod tests {
    use super::*;
    use commodity::{Commodity, CommodityType, CommodityTypeID};
    use rust_decimal::prelude::*;
    use rust_decimal::Decimal;

    use rand::prelude::*;
    use std::str;
    use std::str::FromStr;

    #[test]
    fn chacha20_case_1() {
        let key = generate_auction_key();
        let cipher = ChaCha20Poly1305::new(&key);
        let nonce = generate_nonce("1233");

        let ciphertext = cipher
            .encrypt(&nonce, b"plaintext message".as_ref())
            .expect("encryption failure!"); // NOTE: handle this error to avoid panics!
        let plaintext = cipher
            .decrypt(&nonce, ciphertext.as_ref())
            .expect("decryption failure!");

        println!("{:?}", ciphertext);
        println!("{:?}", str::from_utf8(&plaintext).unwrap());

        assert_eq!(&plaintext, b"plaintext message");
    }

    #[test]
    fn auction_case_1() {
        let key = generate_auction_key();
        let nonce = generate_nonce("1233");

        let mut auction = Auction::new();

        let USD = Commodity::from_str("123433000.11 USD").unwrap();

        let mut bid_1 = Bids::new();
        bid_1.bid_id = "123".to_string();
        bid_1.bid_amt = USD.value.to_string();

        let mut bid_2 = Bids::new();
        bid_2.bid_id = "123".to_string();
        bid_2.bid_amt = USD.value.to_string();

        let mut bid_3 = Bids::new();
        bid_3.bid_id = "123".to_string();
        bid_3.bid_amt = USD.value.to_string();

        auction.auctionId = "123".to_string();
        auction.bids.push(bid_1);
        auction.bids.push(bid_2);
        auction.bids.push(bid_3);

        println!("{:?}", auction);

        let encrypted_auction = encrypt_auction(auction, &key, &nonce);

        println!("{:?}", encrypted_auction);

        let decryped_action = decrypt_auction(encrypted_auction, &key, &nonce);

        println!("{:?}", decryped_action);
    }
}
