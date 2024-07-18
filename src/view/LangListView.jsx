import { backend } from "@/global";
import axios from "axios";
import { useEffect, useState } from "react";
import { MessagePlugin } from "tdesign-react";

export default function LangListView(){
	const [loaded, setLoaded] = useState(false);
	const [list, setList] = useState([]);
	useEffect(() => {
		if(!loaded)
			axios.get(backend + 'lang/words', {
				headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
			})
				.then(res => {
					setList(res.data.list);
					setLoaded(true);
				})
				.catch(err => {
					MessagePlugin.error('获取生词表失败');
				});
	})
	return <>
		{list.map(word => <>
			生词：{word.first}
			<br />
			添加时间：{new Date(word.second).toLocaleString()}
			<br />
		</>)}
	</>;
}
