const postContainer = document.getElementById("main");
const commentForm = document.getElementById("commentForm");
const editPostForm = document.getElementById("editPostForm");
const editCommentForm = document.getElementById("editCommentForm");

postContainer.addEventListener("click", function (event) {
  switch (event.target.dataset.actionType) {
    case "commentComment": {
      // Get id data bubbled from the button.
      let postId = event.target.dataset.postId;
      let commentId = event.target.dataset.commentId;
      let comment = document.getElementById("comment" + commentId);

      // Change the form submit URL
      document.forms.commentForm.action =
        postId + "/comment/" + commentId + "/create";
      // Reset the form value because the same form is used everywhere
      document.forms.commentForm.text.value = "";
      // Move the form after the comment
      comment.after(commentForm);
      // Hide other forms and make this one visible.
      editPostForm.classList.add("hidden");
      editCommentForm.classList.add("hidden");
      commentForm.classList.remove("hidden");
      break;
    }

    case "commentPost": {
      let postId = event.target.dataset.postId;
      let post = document.getElementById("post");

      document.forms.commentForm.action = postId + "/comment/create";

      document.forms.commentForm.text.value = "";

      post.after(commentForm);

      editPostForm.classList.add("hidden");
      editCommentForm.classList.add("hidden");
      commentForm.classList.remove("hidden");
      break;
    }

    case "editComment": {
      let postId = event.target.dataset.postId;
      let commentId = event.target.dataset.commentId;
      let comment = document.getElementById("comment" + commentId);

      document.forms.editCommentForm.action =
        postId + "/comment/" + commentId + "/edit";

      let textSection = document.getElementById("commentText" + commentId);
      document.forms.editCommentForm.text.value = textSection.textContent;

      comment.after(editCommentForm);

      editPostForm.classList.add("hidden");
      editCommentForm.classList.remove("hidden");
      commentForm.classList.add("hidden");
      break;
    }

    case "editPost": {
      let postId = event.target.dataset.postId;
      let post = document.getElementById("post");

      document.forms.editPostForm.action = postId + "/edit";

      // Find the content to be edited from the actual post
      let textSection = document.getElementById("postText");
      let title = document.getElementById("postTitle");
      document.forms.editPostForm.text.value = textSection.textContent;
      document.forms.editPostForm.title.value = title.textContent;

      post.after(editPostForm);

      editPostForm.classList.remove("hidden");
      editCommentForm.classList.add("hidden");
      commentForm.classList.add("hidden");
      break;
    }

    case "hideForm": {
      function lookUp(formType) {
        let lookUpObject = {
          editPost: editPostForm,
          comment: commentForm,
          editComment: editCommentForm,
        };
        return lookUpObject[formType];
      }
      lookUp(event.target.dataset.formType).classList.add("hidden");
      break;
    }

    default:
      break;
  }
});

// when user clicks on a link, we want to visually flash the message
let timer = null;
window.addEventListener("hashchange", function () {
  let hash = this.location.hash;
  if (!hash) return;
  // we don't want to flash forms because it looks ugly
  if (["#editCommentForm", "#commentForm", "#editPostForm"].includes(hash))
    return;

  let hashEl = document.querySelector(hash);
  hashEl.classList.add("bg-main");

  //removes the contrast background CSS AKA produces a visual flash
  //empties the location hash so user can flash the same message twice in a row
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    hashEl.classList.remove("bg-main");
    history.pushState(null, null, " ");
  }, 300);
});
