const ack_queue = 'ts2-backend'

module.exports = {
    async index(request, response) {
        const operation = 'get'
        const attribute = 'all'
        await request.amqp.publisher(JSON.stringify({
            operation,
            ack_queue,
            attribute
        }))
        let result = await request.amqp.consumer()
        return response.json(result)
    },

    async show(request, response) {
        const operation = 'get'
    },

    async store(request, response) {
        const operation = 'insert'
        await request.amqp.publisher(JSON.stringify(request.body))
        let result = await request.amqp.consumer()
        return response.json(result)
    },

    async update(request, response) {
        const operation = 'update'
    },

    async destroy(request, response) {
        const operation = 'delete'
    }
}