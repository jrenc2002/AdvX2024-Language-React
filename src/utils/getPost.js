import axios from "axios";

export default function getPost(postId) {
	let ret = null;
	axios.get(backend + 'post/' + postId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
		.then(res => {
			console.log(res.data);
			ret = res.data;
		})
		.catch(err => {
			ret = err;
		});
	if(ret)
		return ret;
};
