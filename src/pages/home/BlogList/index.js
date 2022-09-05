/**
 *  @description : create blog items from  blog list data
 *  @param {blog data} prop 
 */

const BlogList = (prop) => {
    return (
        <div className="p-3 overflow-auto bg-white">
            {
                prop.data.map((item, index) =>
                    <div key={index} className="border border-2 mt-3 p-2 ">
                        <p className="blog-title">
                            {item.title}
                        </p>
                        <p>
                            {item.body}
                        </p>
                    </div>)
            }
        </div>
    )
}

export default BlogList;