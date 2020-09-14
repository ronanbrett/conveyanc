use super::db::DB;
use super::queue::NatsQueue;
use futures::stream::StreamExt;

use mongodb::bson::{self, doc, Bson, Document};
use mongodb::error::{Error, Result};

pub fn handle_auction(msg: String, db: &DB) {
    println!("{:?}", msg);
}

pub async fn handle_auction_update(msg: String, db: &DB) -> Result<()> {
    let data = db.client.database("property");
    let propertyDocCol = data.collection("propertydocuments");

    let mut cursor = propertyDocCol.find(None, None).await?;

    while let Some(result) = cursor.next().await {
        match result {
            Ok(document) => {
                if let Some(title) = document.get("_id").and_then(Bson::as_object_id) {
                    println!("title: {}", title);
                } else {
                    println!("no title found");
                }
            }
            Err(e) => return Err(e.into()),
        }
    }

    Ok(())
}

pub async fn emit_auction_created_event(msg: String, queue: &NatsQueue) -> Result<()> {
    queue
        .connection
        .publish("auctions.created", b"This is a message!")
        .await?;
    Ok(())
}

pub async fn handle_auction_created(msg: String, db: &DB, queue: &NatsQueue) -> Result<()> {
    let data = db.client.database("property");
    let collection = data.collection("propertydocuments");

    let mut cursor = collection.find(None, None).await?;

    while let Some(result) = cursor.next().await {
        match result {
            Ok(document) => {
                if let Some(title) = document.get("_id").and_then(Bson::as_object_id) {
                    println!("{:?}", title);
                    emit_auction_created_event(title.to_string(), queue).await?;
                }
            }
            Err(e) => return Err(e.into()),
        }
    }

    Ok(())
}
