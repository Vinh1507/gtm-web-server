import ContestListing from "../view/components/contest-list/ContestListing";
const MenuConfig = {
  getMenuItem() {

    const unsortedMenu = MenuConfig.items;

    unsortedMenu.forEach((item) => {
      if (item.component.name === '') {
        item.component = item.component();
      }
    });

    return unsortedMenu.sort((item1, item2) => {
      return item1.sortOrder - item2.sortOrder;
    });
  },

  /**
   * menu items
   */
  items: [
    {
      id: "contests",
      title: "Contests",
      path: "/contests",
      component: ContestListing,
      className: "checkout",
      sortOrder: 10,
    },
  ],
};

export default MenuConfig;
