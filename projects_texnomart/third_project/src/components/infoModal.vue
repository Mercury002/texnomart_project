<template>
    <div v-show="infoModal" class="infoModal">
        <div class="overflow" @click="$emit('close-modal')"></div>
        <div class="infoModal__content" v-if="product">
            <div class="infoModal__pic">
                <img :src="product.thumbnail" alt="">
            </div>

            <div class="infoModal__info">
                <div>
                    <p><strong>Model: </strong>{{ product?.title }}</p>
                    <p><strong>Brand: </strong>{{ product?.brand }}</p>
                    <p><strong>Stock: </strong>{{ product?.stock }}</p>

                    <p><strong>Rating: </strong>{{ product?.rating }}</p>
                    <p><strong>Description: </strong>{{ product?.description }}</p>
                    <p><strong>Price: {{ maskSumField(product?.price) }}$({{ maskSumField(priceInSom(product?.price)) }}
                            UZS)</strong>
                    </p>
                    <div v-if="isComment" class="infoModal__comment-part">
                        <strong>Comments</strong>
                        <ul v-if="comments.length" class="infoModal__comments">
                            <li v-for="com in comments"><strong>{{ com?.user?.username }}:</strong> {{ com?.body }}</li>
                        </ul>
                        <i v-else>No comments yet :(</i>
                    </div>
                    <textarea v-model="commentText" v-else cols="50" rows="7"></textarea>
                </div>
                <div class="infoModal__btns">
                    <div>
                        <button class="add-comment btn" @click="isComment = !isComment">{{
                            isComment? 'Add comment': 'Show comments'
                        }}</button>
                        <button class="btn" :class="!isComment && commentText ? 'add-comment' : 'disabled-btn'"
                            @click="saveComment">Save comment</button>
                    </div>
                    <button class="buy btn" @click="buyProduct">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['infoModal', 'product'],
    data: () => ({
        isComment: true,
        isSaveComment: false,
        comments: [],
        commentText: '',
        user: {}
    }),
    methods: {
        async saveComment() {
            let formData = {
                body: this.commentText,
                postId: this.product.id,
                userId: this.user.id,
            }
            // await fetch('https://dummyjson.com/comments/add', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
        },
        priceInSom(price) {
            return Math.round((11081.39 * price) * 100) / 100
        },
        maskSumField(summ) {
            return Number.parseFloat(summ)?.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ') ?? 0;
        },
        buyProduct() {
            let user = localStorage.getItem('userInfo')
            if (user) {
                alert(`The product is purchased, in a couple of days we will send it by mail`)
            } else {
                alert('please register first')
            }
        },

        async getComments() {
            await this.$store.dispatch('GETT_ALL_COMMENT', 4)
            this.comments = this.$store.getters['getComments']
        }
    },
    async created() {
        await this.$store.dispatch('GETT_ALL_COMMENT', 4)
        this.comments = this.$store.getters['getComments']
        this.user = localStorage.getItem('userInfo')
    }

}
</script>

<style lang="scss">
.infoModal {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;

    &__content {
        width: 800px;
        height: 400px;
        border-radius: 4px;
        background-color: aliceblue;
        z-index: 3;
        display: flex;
    }

    &__pic {
        width: 40% !important;
        height: 100% !important;

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__info {
        padding: 15px 20px;
        width: 60%;
        display: flex;
        flex-direction: column;
        position: relative;

        & p:not(last-child) {
            margin-bottom: 3px;
        }
    }

    &__comments {
        max-height: 85px;
        overflow: auto;
    }

    &__comment-part {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
    }

    &__btns {
        margin-top: 10px;
        position: absolute;
        bottom: 5%;
        right: 5%;
        display: flex;
        justify-content: space-between;
        width: 91%;

        .add-comment {
            margin-right: 10px;
            background-color: blueviolet;
        }

        .disabled-btn {
            background-color: gray;
            pointer-events: none;
            user-select: none;
        }

        .disabled-btn:hover {
            transform: scale(1);
        }

        .disabled-btn:active {
            transform: scale(1);
        }

        .buy {
            background-color: green;
        }


    }
}

.btn {
    padding: 5px 15px;
    border-radius: 4px;
    border: none;
    color: #fff;
    font-weight: 700;
    outline: none;
    transition: all .2s;
}

.btn:hover {
    transform: scale(1.1);
}

.btn:active {
    transform: scale(0.9);
}
</style>