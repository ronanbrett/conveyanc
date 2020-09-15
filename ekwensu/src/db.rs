use mongodb::bson::{doc, document::Document, oid::ObjectId, Bson};
use mongodb::error::Result;
use mongodb::{
    options::{AuthMechanism, ClientOptions, Credential},
    Client, Collection, Cursor,
};
use std::env;

#[derive(Clone, Debug)]
pub struct DB {
    pub client: Client,
}

impl DB {
    pub async fn new() -> Result<Self> {
        let mut client_options = ClientOptions::parse("mongodb://127.0.0.1:27017").await?;

        let cred = Credential::builder()
            .username(env::var("MONGO_USER").unwrap())
            .password(env::var("MONGO_PASS").unwrap())
            .source(env::var("MONGO_SOURCE").unwrap())
            .mechanism(AuthMechanism::ScramSha256)
            .build();

        client_options.credential = Some(cred);

        Ok(Self {
            client: Client::with_options(client_options)?,
        })
    }

    pub fn get_collection(&self, dbName: &str, collection: &str) -> Collection {
        let db = self.client.database(dbName);
        let collection = db.collection(collection);
        collection
    }

    pub async fn find_one(&self, dbName: &str, collection: &str) -> Result<Option<Document>> {
        let db = self.client.database(dbName);
        let collection = db.collection(collection);

        let document = collection.find_one(None, None).await?;

        Ok(document)
    }
}
