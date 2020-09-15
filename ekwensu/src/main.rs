mod auction;
mod consts;
mod db;
mod protos;
mod queue;

use auction::*;
use consts::{AUCTION_CREATE, AUCTION_UPDATE};
use db::*;
use dotenv::dotenv;
use futures::stream::StreamExt;
use mongodb::error::Result;
use queue::*;

#[tokio::main]
pub async fn main() -> Result<()> {
    dotenv().ok();

    let db = DB::new().await?;
    let queue = MessagingQueue::new().await?;

    let subject = "auctions.*";
    let mut sub = queue.subscribe_to_queue(subject, "auctions").await?;

    queue.publish(AUCTION_CREATE, "This is a message!").await?;

    while let Some(message) = sub.next().await {
        let subject = String::from(message.subject);

        match subject.as_str() {
            AUCTION_CREATE => {
                let res = String::from_utf8(message.data).unwrap();
                handle_auction_created(res, &db, &queue).await?;
            }
            AUCTION_UPDATE => {
                let res = String::from_utf8(message.data).unwrap();
                handle_auction_update(res, &db).await?;
            }
            _ => {}
        }
    }

    Ok(())
}
