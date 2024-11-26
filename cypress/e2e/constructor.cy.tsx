describe('интерграционное тестирование', () => {
  beforeEach(() => {
    // Перехват запроса и возврат моковых данных
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // Переход на страницу конструктора
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    // Очистка моковых данных
    cy.clearCookies();
  });

  it('добавление ингредиентов и булки в конструктор', () => {
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');

    // Находим и добавляем булку
    cy.get('[data-ingredient="bun"]').find(`button`).first().click();

    // Находим и добавляем ингредиент
    cy.get('[data-ingredient="noBun"]').find('button').first().click();

    // Проверяем, что верхняя булка добавлена
    cy.get('[data-constructor="bun"]')
      .eq(0)
      .find('.constructor-element__text')
      .should('have.text', 'Краторная булка N-200i (верх)');

    // Проверяем, что нижняя булка добавлена
    cy.get('[data-constructor="bun"]')
      .eq(1)
      .find('.constructor-element__text')
      .should('have.text', 'Краторная булка N-200i (низ)');

    // Проверяем, что ингредиент добавлен
    cy.get('[data-constructor="noBun"]')
      .find('.constructor-element__text')
      .should('have.text', 'Биокотлета из марсианской Магнолии');
  });

  describe('тестирование работы модальных окон', () => {
    it('открытие модального окна ингредиента', () => {
      // Находим ингредиент и открываем модалку
      cy.get('[data-ingredient="bun"]').find('[data-ingredient="name"]').contains('Краторная булка N-200i').click();

      // Проверяем, что модалка открылась
      cy.get('[id="modals"]').should('not.be.empty');

      // Проверяем, что в открытом модальном окне отображаются данные именно того ингредиента, по которому был совершен клик
      cy.get('[data-ingredient="modal-name"]').should('have.text', 'Краторная булка N-200i');
    });

    it('закрытие по клику на крестик', () => {
      // Находим ингредиент и открываем модалку
      cy.get('[data-ingredient="noBun"]').first().click();

      // Находим кнопку закрытия и закрываем модалку
      cy.get('[id="modals"]').find('button').click();

            //обязательно проверяем что окно закрылось
            cy.get('[id="modals"]').should('be.empty');
    });

    it('закрытие по клику на оверлей', () => {
      // Находим ингредиент и открываем модалку
      cy.get('[data-ingredient="noBun"]').eq(1).click();

      // Находим оверлэй и закрываем модалку
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });

      //обязательно проверяем что окно закрылось
      cy.get('[id="modals"]').should('be.empty');
    });
  });

  describe('Собирается бургер', () => {
    beforeEach(() => {
      // Перехват запроса и возврат моковых данных
      cy.intercept('GET', `api/auth/user`, {
        fixture: 'user.json'
      }).as('getUser');

      // Настройка мокового токена
      const mockToken = 'mockToken12345';
      localStorage.setItem('accessToken', mockToken); // Указываем мокированные токены
    });
    it('Создание и оформление заказа', () => {
      cy.wait('@getUser');

      //Собирается бургер
      cy.get('[data-ingredient="bun"]').find(`button`).first().click();
      cy.get('[data-ingredient="noBun"]').find('button').first().click();
      cy.get('[data-ingredient="noBun"]').find('button').eq(1).click();

      //Проверяем, что конструктор заполнен
      cy.get('[data-constructor="bun"]').should('have.length', 2);
      cy.get('[data-constructor="noBun"]').should('have.length', 2);

      //Перехватим отправку заказа
      cy.intercept('POST', `api/orders`, {
        fixture: 'order.json'
      }).as('createOrder');

      //Вызывается клик по кнопке «Оформить заказ».
      cy.get('[data-cy=order-button]').find('button').click();
      cy.wait('@createOrder');

      //Проверяем, что модалка открылась
      cy.get('[id="modals"]').should('not.be.empty');

      //Проверим, что номер заказа совпадает
      cy.get('[id="modals"]').find('h2').should('have.text', '58353');

      //Закрываем модалку
      cy.get('[id="modals"]').find('button').click();

      //Проверим, что модалка закрылась
      cy.get('[id="modals"]').should('be.empty');

      //проверим что конструктор пуст
      cy.get('[data-constructor="bun"]').should('have.length', 0);
      cy.get('[data-constructor="noBun"]').should('have.length', 0);
    });
  });
});
