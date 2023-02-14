// Client facing scripts here
const foodItems = document.querySelectorAll('.food-item');
const menus = document.querySelectorAll('.menu');

foodItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (menus[index].style.display === 'none') {
      menus.forEach((menu) => {
        menu.style.display = 'none';
      });
      menus[index].style.display = 'block';
    } else {
      menus[index].style.display = 'none';
    }
  });
});

