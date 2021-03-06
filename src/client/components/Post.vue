<template lang="pug">
section
	header
		span.name {{ post.name }}
		span.host {{ post.host }}
		span.badge.admin(v-if="post.isAdmin") ADMIN
		span.badge.topic-owner(v-if="post.isTopicOwner") &gt;&gt;1
		span.timestamp {{ post.timestamp }}
	article.message(v-html="post.message")
	footer
		.reactions
			.reaction(v-for="r in post.reactions", :class="{ my: r.isMyReaction }", @click="toggleReaction(r)")
				span {{ r.reactionChar }}
				span {{ r.reactionCount }}
		.commands
			button.reply
				fa(:icon="['fas', 'reply']", fixed-width)
			button.reaction
				fa(:icon="['fas', 'plus']", fixed-width)
			button.star(@click="starClicked()", :class="{ starred: post.IsStarred }")
				fa(:icon="starIcon", fixed-width)
			button.other
				fa(:icon="['fas', 'ellipsis-v']", fixed-width)
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import ReactionViewModel from "../../interfaces/ReactionViewModel";
import IPost from "../../interfaces/IPost";
import { mapActions } from "vuex";
@Component({
	components: { Post },
	methods: {
		...mapActions([
			"setStar",
			"addReaction",
			"removeReaction",
		]),
	},
})
export default class Post extends Vue {
	@Prop() private post: IPost;

	public starClicked() {
		(this as any).setStar({
			id: this.post.id,
			isStarred: !this.post.isStarred,
		});
	}

	public toggleReaction(r: ReactionViewModel) {
		let func = (this as any).addReaction;
		if (r.isMyReaction) {
			func = (this as any).removeReaction;
		}
		func({
			postId: this.post.id,
			reaction: r.reactionChar,
		});
	}

	public get starIcon() { return [this.post.isStarred ? "fas" : "far", "star" ]; }
}
</script>


<style lang="scss" scoped>

$white: #fafafa;
$black: #212121;
$gray: #9E9E9E;
$shadow: #a0a0a0;
$accent: #9C27B0;
$accent-text: $white;
$red: #f44336;
$blue: #03A9F4;
$yellow: #FFC107;
$bg: $white;
$fg: $black;


section {
	margin: 1rem;
	background: $bg;
	color: $fg;
	border: none;
	padding: 1rem;
	border: 1px solid $gray;
	transition: all 0.2s ease;
}

header {
	display: flex;
	flex-wrap: wrap;
	* {
		margin-right: 0.5rem;
	}
	.name {
		font-weight: bold;
		font-size: 1.3rem;
	}
	.host {
		color: $gray;
		font-style: italic;
		align-self: flex-end;
		margin-right: 0.9rem;
	}
	.badge {
		border-radius: 4px;
		border: none;
		font-size: 0.75rem;
		padding: 3px 6px;
		align-self: center;
		justify-self: center;
		&.admin {
			color: $red;
			box-shadow: 0 0 2px $red;
		}
		&.topic-owner {
			color: $blue;
			box-shadow: 0 0 2px $blue;
		}
	}
	.timestamp {
		color: $gray;
		display: inline-block;
		margin-left: auto;
	}
}

.message {
	padding: 1rem 0 0 1rem;
	font-feature-settings: "pkna";
	white-space: pre;
	line-height: 2em;
	font-size: 14pt;
	font-family:　"ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN W3", "游明朝 Medium", "Yu Mincho Medium", "游明朝体", "YuMincho", "ＭＳ 明朝", Century, serif !important;
}

.reactions {
	padding: 0.4rem 0 0.4rem 1rem;
	border-bottom: dotted 1px $shadow;

	.reaction {
		display: inline-block;
		margin: 0.2rem;
		border-radius: 4px;
		padding: 0.2rem;
		font-size: 0.9rem;
		user-select: none;

		&.my {
			background: $accent;
			color: $accent-text;
		}
		&:hover {
			box-shadow: 0 0 2px $accent;
			cursor: pointer;
		}
		transition: all 0.2s ease;
	}
}

.commands {
	padding: 1rem 0 0 1rem;
	button {
		border: none;
		background: none;
		display: inline-block;
		margin-right: 1rem;
		min-width: 4rem;
		font-size: 1.2rem;
		outline: none;

		&:hover {
			&.reply {
				color: $blue;
			}
			&.reaction {
				color: $red;
			}
			&.star {
				color: $yellow;
			}
			opacity: 0.5;
		}

		&.star.starred {
			color: $yellow;
		}

		transition: all 0.1s ease;

	}
}
</style>
