import NATS from 'nats'
const nats = NATS.connect()

export function initialize () {
  console.log('Entered in init function')
  // Simple Publisher
  nats.publish('foo', 'Hello World!')

  // Simple Subscriber
  nats.subscribe('foo', function (msg) {
    console.log('Received a message: ' + msg)
  })
}
