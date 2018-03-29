import React,{ Component } from 'react'

const MyButton =function(props){
	
	var com=props.flag ? <h1>aaa</h1> :<h1>bbb</h1>
	
	return(
		<div>
		{com}
			<div className='from-group'>
				<label htmlFor='username'>Email address</label>
				<input type='text' onChange={props.getVal} className='form-control' id='username' placeholder='用户名' />
			</div>
			
			<button onClick={props.onClick}>添加</button>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>用户名</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
				{
				
					props.todolist.map((item,index)=>{
							console.log(props)
						return (
							<tr key={index}>
								<td>{index+1}</td>
								<td>{item}</td>
								<td>
									<button onClick={props.onDelfn.bind(this,index)}>删除</button>
								</td>
							
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>
	)
	
	
	
}


export default MyButton