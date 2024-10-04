import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query {
    posts {
      id
      title
      slug
      description
    }
  }
`;

const Blogs = () => {
	const { data, loading, error } = useQuery(QUERY);

	console.log(data.posts);

	return (
		<div>
			<ul>
				{data.products.map(({ id, name, slug }) => (
					<li key={id}>
						<Link to={`/products/${slug}`}>{name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Blogs;