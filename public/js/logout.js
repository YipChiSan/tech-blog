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

const blogID = document.querySelector('#blog').getAttribute("value");

const updateHandler = async (event) => {
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

const editHandler = (event) => {
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
    formUpdateBtn.addEventListener('click', updateHandler);
    formUpdateBtn.textContent = "Update";

    formUpdateDiv.appendChild(formUpdateBtn);
    newForm.appendChild(formUpdateDiv);

    blogEl.innerHTML = "";
    blogEl.appendChild(newForm);

    
};

document
  .querySelector('#edit-button')
  .addEventListener('click', editHandler);

document.querySelector('#logout').addEventListener('click', logout);
