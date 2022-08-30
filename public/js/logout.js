const blogID = document.querySelector('#blog').getAttribute("value");
let commentID;
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

const createComment = async (event) => {
  event.preventDefault();

  const context = document.querySelector('#comment-context').value.trim();
  console.log(context);
  if ( context) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({context: context, blog_id: blogID }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};



const delCommentBtnHandler = async (event) => {
  if (event.target.hasAttribute('value')) {
    const id = event.target.getAttribute('value');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  }
};

const updateCommentHandler = async (event) => {
    event.preventDefault();

    const context = document.querySelector('#comment-context-input').value.trim();
    
    if (context) {
      
      const response = await fetch(`/api/comment/${commentID}`, {
        method: 'PUT',
        body: JSON.stringify({context: context }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update comment');
      }
    }
};

const editCommentBtnHandler = (event) => {
  event.preventDefault();
  commentID = event.target.getAttribute("value");
  
  const selector = '#c' + commentID;
  const contextEl = document.querySelector(selector);
  const context = contextEl.textContent.trim();

  if (context) {
    const newForm = document.createElement("form");
    newForm.setAttribute("class" , "form");

    const formContextDiv = document.createElement('div');
    formContextDiv.setAttribute("class", "form-group");

    const formContextLabel = document.createElement('label');
    formContextLabel.setAttribute('for', 'comment-context-input');
    formContextLabel.textContent = "Comment Context:";

    const formContextInput = document.createElement('input');
    formContextInput.setAttribute("class", "form-input");
    formContextInput.setAttribute("type", "text");
    formContextInput.setAttribute("id", "comment-context-input");
    formContextInput.setAttribute("name", "comment-context-input");
    formContextInput.setAttribute("value", context);

    formContextDiv.appendChild(formContextLabel);
    formContextDiv.appendChild(formContextInput);

    newForm.appendChild(formContextDiv);

    const formUpdateDiv = document.createElement('div');
    formUpdateDiv.setAttribute("class", "form-group");

    const formUpdateBtn = document.createElement('button');
    formUpdateBtn.setAttribute("class", "btn btn-primary");
    formUpdateBtn.addEventListener('click', updateCommentHandler);
    formUpdateBtn.textContent = "Update";

    formUpdateDiv.appendChild(formUpdateBtn);
    newForm.appendChild(formUpdateDiv);

    contextEl.innerHTML = "";
    contextEl.appendChild(newForm);
  }
};

const updatePostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title-input').value.trim();
    const context = document.querySelector('#blog-context-input').value.trim();
    
    if (title && context) {
      
      const response = await fetch(`/api/blog/${blogID}`, {
        method: 'PUT',
        body: JSON.stringify({ title: title, context: context }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update blog');
      }
    }
}

const editPostBtnHandler = (event) => {
    event.preventDefault();
    const blogEl = document.querySelector('#blog');
    const title = document.querySelector('#blog-title').textContent.trim();
    const context = document.querySelector('#blog-context').textContent.trim();

    const newForm = document.createElement("form");
    newForm.setAttribute("class" , "form");

    const formTitleDiv = document.createElement('div');
    formTitleDiv.setAttribute("class", "form-group");

    const formTitleLabel = document.createElement('label');
    formTitleLabel.setAttribute('for', 'blog-title-input');
    formTitleLabel.textContent = "Post title:";

    const formTitleInput = document.createElement('input');
    formTitleInput.setAttribute("class", "form-input");
    formTitleInput.setAttribute("type", "text");
    formTitleInput.setAttribute("id", "blog-title-input");
    formTitleInput.setAttribute("name", "blog-title-input");
    formTitleInput.setAttribute("value", title);

    formTitleDiv.appendChild(formTitleLabel);
    formTitleDiv.appendChild(formTitleInput);

    newForm.appendChild(formTitleDiv);

    const formContextDiv = document.createElement('div');
    formContextDiv.setAttribute("class", "form-group");

    const formContextLabel = document.createElement('label');
    formContextLabel.setAttribute('for', 'blog-context-input');
    formContextLabel.textContent = "Post Context:";

    const formContextInput = document.createElement('input');
    formContextInput.setAttribute("class", "form-input");
    formContextInput.setAttribute("type", "text");
    formContextInput.setAttribute("id", "blog-context-input");
    formContextInput.setAttribute("name", "blog-context-input");
    formContextInput.setAttribute("value", context);

    formTitleDiv.appendChild(formContextLabel);
    formTitleDiv.appendChild(formContextInput);

    newForm.appendChild(formContextDiv);

    const formUpdateDiv = document.createElement('div');
    formUpdateDiv.setAttribute("class", "form-group");

    const formUpdateBtn = document.createElement('button');
    formUpdateBtn.setAttribute("class", "btn btn-primary");
    formUpdateBtn.addEventListener('click', updatePostHandler);
    formUpdateBtn.textContent = "Update";

    formUpdateDiv.appendChild(formUpdateBtn);
    newForm.appendChild(formUpdateDiv);

    blogEl.innerHTML = "";
    blogEl.appendChild(newForm);

    
};

if (document
  .querySelector('#edit-button')) {
document
  .querySelector('#edit-button')
  .addEventListener('click', editPostBtnHandler);
  }


document.querySelector('#logout').addEventListener('click', logout);

document.querySelectorAll('.comment').forEach((value) => value.addEventListener('click', editCommentBtnHandler));


document.querySelectorAll('.del-comment').forEach((value) => value.addEventListener('click', delCommentBtnHandler));

document.querySelector('#comment-create').addEventListener('click', createComment);