document.addEventListener('DOMContentLoaded', () => {
  // Show / hide empty state
  let selectedTab = document.getElementById('tab1');

  const showHideEmptyState = () => {
    // Get all and hidden items in selected tab
    const [selectedTabItems, hiddenSelectedTabItems, emptyState] = [
      selectedTab.querySelectorAll('.elem'),
      selectedTab.querySelectorAll('.elem.is-hidden'),
      document.querySelector('.empty-state'),
    ];

    emptyState.classList.toggle(
      'is-visible',
      hiddenSelectedTabItems?.length === selectedTabItems.length
    );
  };

  // Filter by a service
  const tabContents = document.querySelectorAll('.tabs__content');
  const firstTabContent = document.querySelector(
    '.tabs__content:first-of-type'
  );
  const tabs = document.querySelectorAll('.tabs__tablist li');
  const firstTab = document.querySelector('.tabs__tablist li:first-of-type');

  tabContents.forEach((tabContent) => {
    const { style } = tabContent;
    style.display = 'none';
  });
  firstTabContent.style.display = 'block';
  firstTab.classList.add('is-active');

  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      const selectedService = event.currentTarget;
      tabs.forEach((t) => t.classList.remove('is-active'));
      selectedService.classList.add('is-active');

      tabContents.forEach((tabContent) => {
        const { style } = tabContent;
        style.display = 'none';
      });

      const selectedTabId = selectedService
        .querySelector('a')
        .getAttribute('href');
      selectedTab = document.querySelector(selectedTabId);
      selectedTab.style.display = 'block';

      // Show / hide empty state
      showHideEmptyState();
    });
  });

  // Filter by a year
  const years = document.querySelectorAll('.filter-date .button');
  const items = document.querySelectorAll('.elem');

  years.forEach((yearTab) => {
    yearTab.addEventListener('click', (event) => {
      const selectedYear = event.currentTarget;
      const year = selectedYear.dataset.filter;

      items.forEach((el) => {
        el.classList.add('is-hidden');
      });

      years.forEach((btn) => btn.classList.remove('is-active'));
      selectedYear.classList.add('is-active');

      if (year === 'all') {
        items.forEach((el) => {
          el.classList.remove('is-hidden');
        });
      } else {
        items.forEach((el) => {
          if (!el.classList.contains(year)) {
            el.classList.add('is-hidden');
          } else {
            el.classList.remove('is-hidden');
          }
        });
      }
      // Show / hide empty state
      showHideEmptyState();
    });
  });
});
