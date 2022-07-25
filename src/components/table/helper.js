export default function filterCountry(event) {
  const search = event.target.value.toLowerCase();
  [...event.path[2].lastChild.firstChild.children].forEach((tr) => {
    const name = tr.getAttribute('data-name').toLowerCase();
    if (!name.includes(search)) {
      tr.classList.add('hide');
    } else {
      tr.classList.remove('hide');
    }
  });
}
