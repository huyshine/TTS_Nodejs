import React from 'react'
import ItemBlog from '../../../conpoments/ItemBlog'
import Sidebar from '../../../conpoments/sidebar'

type Props = {}

const BlogDetail = (props: Props) => {
  return (
    <div className="row">
        <ItemBlog/>
        <Sidebar/>        
    </div>
  )
}

export default BlogDetail