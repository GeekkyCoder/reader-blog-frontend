const blogsReducerSelector = state => state.blogs 

const blogsSelector = state => state.blogs.blogs 

const errorSelector = state => state.blogs.error 

const loadingSelector = state => state.blogs.isLoading

const isModalOpenSelector = state => state.blogs.isModalOpen



module.exports = {
    blogsReducerSelector,
    blogsSelector,
    errorSelector,
    loadingSelector,
    isModalOpenSelector
}