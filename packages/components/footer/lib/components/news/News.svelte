<script>
	import Text from "@dusk-network/text";
	import Heading from "@dusk-network/heading";
	import "./styles.css";

	export let content;
</script>

{#if content}
	<div class="footer-news">
		<div class="footer-news__wrapper">
			<Heading --color="var(--colors-gray)">{@html content.heading.heading}</Heading>
			<div class="footer-news__news">
				{#each content.news_articles.data as article}
					<a href="{article.url}">
						<div class="footer-news__article">
							<div class="footer-news__article--image">
								<img
									src="{article.attributes.image.data.attributes.url}"
									alt="{article.attributes.image.data.attributes.alternativeText}"
								/>
							</div>
							<time datetime="{article.attributes.publishedAt}" class="footer-news__article--date">
								<Text size="x-small" --color="var(--colors-taupe)"
									>{article.attributes.publishedAt
										? new Date(article.attributes.publishedAt).toLocaleDateString("en-US", {
												month: "short",
												day: "2-digit",
												year: "numeric",
										  })
										: "UNPUBLISHED"}</Text
								>
							</time>
							<div class="footer-news__article--title">
								<Text size="x-large" --color="var(--colors-gray)"
									>{article.attributes.headline.heading}</Text
								>
							</div>
							<div class="footer-news__article--author">
								<Text size="x-small" --color="var(--colors-taupe)"
									>{article.attributes.author.data.attributes.first_name}
									{article.attributes.author.data.attributes.last_name}</Text
								>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}
