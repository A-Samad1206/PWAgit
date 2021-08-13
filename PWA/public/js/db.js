db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
  if (err.code == 'failed-precondition') {
    //Probably mul;tiple tab opened
    console.log('Persistence failed');
  } else if (err.code == 'unimplemented') {
    //Lack of browser support
    console.log('persitence is not available');
  }
});

db.collection('recipes').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    // console.log( change.doc.data());
    // console.log(change.doc.id)
    // console.log(change.type)

    if (change.type === 'added') {
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection('recipes')
    .add(recipe)
    .catch((err) => console.log(err));
  console.log('object');
  form.title.value = '';
  form.ingredients.value = '';
});
// remove a recipe
const recipeContainer = document.querySelector('.recipes');
// console.log('recipeContainer', recipeContainer);
recipeContainer.addEventListener('click', (evt) => {
  //   for (const prop in evt) console.log(prop, '=========', evt[prop]);
  //   console.log('evt.target.tagName', evt.target.tagName);
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('recipes').doc(id).delete();
  }
});
