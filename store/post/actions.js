export default {
    initPost(context, payload) {
        return this.$axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
            context.commit('setPosts', response.data.slice(0, 5))
            return response.data.slice(0,5)
            //context.commit('setPOstsMeta', response.data.meta)
        })
        console.log('action')
    },

    savePost(context, payload) {
        console.log(payload)
        return this.$axios.post('http://127.0.0.1:8000/api/post', payload).then((response) => {
            context.commit('setPosts', response.data.data)
            return response
            //context.commit('setPOstsMeta', response.data.meta)
        })
        console.log(payload)
    },
    updatePost(context, payload) {
        console.log(payload)
        return this.$axios.put('http://127.0.0.1:8000/api/post/' + payload.id, payload).then((response) => {
            //context.commit('setPosts', response.data.data)
            return response
            //context.commit('setPOstsMeta', response.data.meta)
        }).catch(error => console.log(error))

    },

    deletePost(context, id) {
        return this.$axios
          .delete('https://jsonplaceholder.typicode.com/todos/' + id)
          .then(() => {
            context.commit('deletePost', id)
          })
      },
}