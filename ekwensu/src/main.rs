mod auction;
mod db;
mod queue;

use auction::*;
use db::*;
use dotenv::dotenv;
use futures::stream::StreamExt;
use mongodb::error::Result;
use queue::*;

#[tokio::main]
pub async fn main() -> Result<()> {
    dotenv().ok();
    let db = DB::init().await?;
    let queue = NatsQueue::init().await?;

    let subject = "auctions.*";
    let mut sub = queue.connection.subscribe(subject).await?;

    queue
        .connection
        .publish("auctions.create", b"This is a message!")
        .await?;

    while let Some(message) = sub.next().await {
        let subject = String::from(message.subject);

        match subject.as_str() {
            "auctions.create" => {
                let res = String::from_utf8(message.data).unwrap();
                handle_auction_created(res, &db, &queue).await?;
            }
            "auctions.update" => {
                let res = String::from_utf8(message.data).unwrap();
                handle_auction_update(res, &db).await?;
            }
            _ => {}
        }
    }

    Ok(())

    // client.disconnect().await;
}
