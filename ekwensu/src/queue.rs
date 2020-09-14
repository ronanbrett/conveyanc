use mongodb::error::Result;
use nats::asynk::{connect, Connection, Subscription};

#[derive(Clone, Debug)]
pub struct NatsQueue {
    pub connection: Connection,
}

impl NatsQueue {
    pub async fn init() -> Result<Self> {
        let address = "0.0.0.0:4222";
        let connection = connect(address).await?;

        Ok(Self {
            connection: connection,
        })
    }
}
