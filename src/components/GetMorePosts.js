import { useState, useRef } from "react";

import axios from "axios";


const LoadMore = (props) => {
  const endOfPageRef = useRef();
	const [createdRef, setRef] = useState(false);

	const nextPosts = () => {
		axios
			.post(
				'https://akademia108.pl/api/social-app/post/older-then',
				{
					date: `${props.posts[props.posts.length - 1].created_at}`,
				}
			)
			.then((req) => {
				setTimeout(() => {
					props.setPosts(props.posts.concat(req.data));
					setRef(false);
				}, 300);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	if (props.posts[0]) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0) {
					nextPosts();
					observer.unobserve(entry.target);
				}
			});
		}, {
      rootMargin: '0px',
      threshold: 0.9,
    });

		if (endOfPageRef.current) {
			if (!createdRef) {
				observer.observe(endOfPageRef.current);
				setRef(true);
			}
		}
	}

	return (
		<div
			ref={(node) => {
				endOfPageRef.current = node;
			}}
			style={{ height: '50px' }}
			className='empty'
		>
			Load more
		</div>
	);
}

export default LoadMore;