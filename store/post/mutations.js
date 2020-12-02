export default {
    setPosts(state, posts) {
        state.posts = posts
    },
    setPostsMeta(state, postsMeta) {
        state.postsMeta = postsMeta
    },
    deletePost(state, id) {
        console.log(state.posts = state.posts.filter(item => item.id !== id));

    }
}
