use mongodb::error::Result;
use nats::asynk::{connect, Connection, Subscription};

#[derive(Clone, Debug)]
pub struct MessagingQueue {
    pub connection: Connection,
}

impl MessagingQueue {
    pub async fn new() -> Result<Self> {
        let address = "0.0.0.0:4222";
        let connection = connect(address).await?;

        Ok(Self {
            connection: connection,
        })
    }

    pub async fn publish(&self, subject: &str, msg: &str) -> Result<()> {
        self.connection.publish(subject, msg).await?;
        Ok(())
    }

    pub async fn publish_bytes(&self, subject: &str, msg: Vec<u8>) -> Result<()> {
        self.connection.publish(subject, msg).await?;
        Ok(())
    }

    pub async fn subscribe(&self, subject: &str) -> Result<Subscription> {
        let sub = self.connection.subscribe(subject).await?;
        Ok(sub)
    }

    pub async fn subscribe_to_queue(&self, subject: &str, queue: &str) -> Result<Subscription> {
        let sub = self.connection.queue_subscribe(subject, queue).await?;
        Ok(sub)
    }
}
