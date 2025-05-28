let nums = document.querySelectorAll('.format_nums_rub');
nums.forEach(num => {
  let raw = parseFloat(num.textContent.replace(/\s/g, '')); // удаляем пробелы, превращаем в число
  if (!isNaN(raw)) {
    const formatted = raw.toLocaleString('fr-FR');
    num.textContent = formatted + ' ₽';
  }
});

let nums_eur = document.querySelectorAll('.format_nums_eur');
nums_eur.forEach(num => {
  let raw = parseFloat(num.textContent.replace(/\s/g, '')); // удаляем пробелы, превращаем в число
  if (!isNaN(raw)) {
    const formatted = raw.toLocaleString('fr-FR');
    num.textContent = formatted + ' €';
  }
});

const data = {
  "Aston Martin": {
    'DB11': ['4.0 V8 Coupe', '4.0 V8 Volante', '5.2 V12 Coupe', '5.2 V12 Coupe AMR'],
    'DB9': ['6.0 V12 Coupe'],
    'DBS': ['5.2 Superleggera Coupe', '5.2 Superleggera Volante', '6.0 V12 Coupe'],
    'DBX': ['4.0 V8', '4.0 V8 707'],
    'Rapide': ['6.0S V12'],
    'Vanquish': ['5.9 V12 Coupe', '6.0 V12 Coupe', '6.0 V12 Volante'],
    'Vantage': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
  },
  "Audi": {
    'A3': ['2.0 TDI Dynamic', '40 TFSI', '40 TFSI Premium', '40 TFSI Quattro Premium', 'Spotback e-tron'],
    'A4': ['30 TDI', '30 TDI Premium', '35 TDI Premium', '35 TDI Quattro Premium', '40 TDI Quattro Premium', '40 TFSI', '40 TFSI Premium', '45 TFSI', '45 TFSI Premium', '45 TFSI Quattro Premium'],
    'A5': ['35 TDI Quattro dynamic Sportback', '35 TDI quattro Premium Sport Back', '35 TDI Quattro Sportback', '35 TDI Sportback', '40 TDI Quattro Premium Coupe', '40 TDI Quattro Premium Sportback', '40 TDI Quattro Sportback', '40 TFSI Quattro Premium Sportback', '40 TFSI Quattro Sportback', '45 TFSI Quattro Cabriolet', '45 TFSI Quattro Coupe', '45 TFSI Quattro Premium Sportback', '45 TFSI Quattro Sportback'],
    'A6': ['35 TDI', '35 TDI Dynamic', '35 TDI Premium', '35 TDI Quattro', '35 TDI Quattro Premium', '35 TDI Quattro Sport', '40 TDI', '40 TDI Premium', '40 TDI Quattro', '40 TDI Quattro Premium', '40 TDI Quattro Sprot', '40 TFSI', '40 TFSI Premium', '40 TFSI Quattro', '40 TFSI Quattro Dynamic', '40 TFSI Quattro Premium', '45 TDI Quattro Premium', '45 TFSI', '45 TFSI Premium', '45 TFSI Quattro', '45 TFSI Quattro Premium', '50 TDI Quattro Premium', '50 TFSI Quattro Sport', '55 TDI Quattro Premium', '55 TDI Quattro Sport'],
    'A7': ['40 TDI', '40 TDI Premium', '40 TFSI Quattro Premium', '40 TFSI Quattro Sport', '45 TDI Quattro Preimum', '45 TDI Quattro Premium', '45 TDI Quattro Premium', '50 TDI Quattro Premium', '50 TDI Quattro Sport', '50 TDI Quattrp Premium', '50 TFSI Quattro Premium', '55 TDI Quattro', '55 TDI Quattro Dynamic', '55 TDI Quattro Premium', '55 TDI Quattro Sport', '55 TFSI e Quattro Premium', '55 TFSI e 콰트로 프리미엄', '55 TFSI Quattro Preimum', '55 TFSI Quattro Premium'],
    'A8': ['50 TDI Quatrro Exclusive', '50 TDI Quattro', '50 TDI Quattro Design LWB', '50 TDI Quattro LWB', '50 TDI Quattro Premium', '55 TFSI Quattro LWB', '55 TFSI Quattro Premium LWB', '55 TFSI Quattro SWB', '60 TFSI Quattro LWB'],
    'e-tron GT': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q2': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q3': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q4': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q4 e-tron': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q5': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q7': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q8': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'Q8 e-tron': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'R8': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'RS e-tron GT': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'RS3': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'RS5': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'RS6': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'RS7': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'RSQ8': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'S3': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'S4': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'S5': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'S6': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'S7': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'S8': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'SQ5': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'SQ7': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'SQ8': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'TTRS': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
    'TTS': ['4.0 V8 Coupe', '4.0 V8 Roadster', '4.3 V8 Roadster', '4.7 V8 Roadster', '4.7S V8 Roadster', '5.2 V12 Final Edition'],
  },
  "Bentley": {
    'Bentayga': [],
    'Continental': [],
    'Flying Spur': [],
    'Mulsanne': [],
  },
  "Benz (Mercedes-Benz)": {
    'A-Class': [],
    'Continental': [],
    'B-Class': [],
    'C-Class': [],
    'CLA-Class': [],
    'CLE-Class': [],
    'CLS-Class': [],
    'E-Class': [],
    'EQA': [],
    'EQB': [],
    'EQC': [],
    'EQE': [],
    'EQS': [],
    'G-Class': [],
    'GL-Class': [],
    'GLA-Class': [],
    'GLB-Class': [],
    'GLC-Class': [],
    'GLE-Class': [],
    'GLS-Class': [],
    'My B': [],
    'Others': [],
    'S-Class': [],
    'SL-Class': [],
    'SLC-Class': [],
    'SLK-Class': [],
    'Sprinter': [],
    'V-Class': [],
  },
  "BMW": {
    '1-Series': [],
    '2-Series': [],
    '3-Series': [],
    '4-Series': [],
    '5-Series': [],
    '6-Series': [],
    '7-Series': [],
    '8-Series': [],
    'Gran Turismo': [],
    'i3': [],
    'i4': [],
    'i5': [],
    'i7': [],
    'i8': [],
    'iX': [],
    'iX1': [],
    'iX3': [],
    'M2': [],
    'M3': [],
    'M4': [],
    'M5': [],
    'M6': [],
    'M8': [],
    'X1': [],
    'X1': [],
    'X3': [],
    'X3M': [],
    'X4': [],
    'X4M': [],
    'X5': [],
    'X5M': [],
    'X6': [],
    'X6M': [],
    'X7': [],
    'XM': [],
    'Z4': [],
  },
      "Book Ki Eun Award": {},
    "Cadillac": {},
    "Chevrolet": {},
    "Chevrolet (GM Daewoo)": {},
    "Chrysler": {},
    "Citroen / DS": {},
    "Daihatsu": {},
    "Dodge": {},
    "Dongfeng": {},
    "Ferrari": {},
    "Fiat": {},
    "Folstar": {},
    "Ford": {},
    "Genesis": {},
    "GMC": {},
    "Honda": {},
    "Hyundai": {},
    "Infinity": {},
    "Isuzu": {},
    "Jaguar": {},
    "Jeep": {},
    "Kia": {},
    "Lamborghini": {},
    "Land Rover": {},
    "Lexus": {},
    "Lincoln": {},
    "Lotus": {},
    "Maserati": {},
    "Matsuda": {},
    "McLaren": {},
    "Mini": {},
    "Nissan": {},
    "Peugeot": {},
    "Porsche": {},
    "Renault": {},
    "Renault-Korea": {},
    "Rolls-Royce": {},
    "Smart": {},
    "Ssangyong": {},
    "Suzuki": {},
    "Tesla": {},
    "Toyota": {},
    "Volkswagen": {},
    "Volvo": {},
    "Прочие бренды": {}
}
document.querySelectorAll('input').forEach(input => {
  input.setAttribute('autocomplete', 'off')
})

const containers = document.querySelectorAll('.custom-select-container[data-level]');

function getOptions(level) {
  if (level === 1) {
    return Object.keys(data);
  } else if (level === 2) {
    const brand = containers[0].querySelector('.custom-input').value;
    return brand && data[brand] ? Object.keys(data[brand]) : [];
  } else if (level === 3) {
    const brand = containers[0].querySelector('.custom-input').value;
    const model = containers[1].querySelector('.custom-input').value;
    return brand && model && data[brand] && data[brand][model] ? data[brand][model] : [];
  }
  return [];
}

function enableLevel(level) {
  const input = containers[level - 1].querySelector('.custom-input');
  input.disabled = false;
  input.value = '';
  containers[level - 1].querySelector('.custom-options').innerHTML = '';
}

function resetBelow(level) {
  // Сбрасываем и отключаем только селекторы цепочки ниже уровня level
  for (let i = level; i < containers.length; i++) {
    const input = containers[i].querySelector('.custom-input');
    input.value = '';
    input.disabled = true;
    containers[i].querySelector('.custom-options').innerHTML = '';
  }
}

function initCustomSelect(container, options = null) {
  const input = container.querySelector('.custom-input');
  const optionsBox = container.querySelector('.custom-options');
  const toggle = container.querySelector('.toggle');
  const level = container.dataset.level ? +container.dataset.level : null;

  function renderOptions(optionList) {
    optionsBox.innerHTML = '';
    optionList.forEach(option => {
      const div = document.createElement('div');
      div.classList.add('custom-option');
      div.textContent = option;
      div.addEventListener('click', () => {
        input.value = option;
        optionsBox.classList.remove('show');
        if (toggle) toggle.style.transform = 'rotate(0deg)';

        if (level) {
          resetBelow(level);
          if (level < 3) enableLevel(level + 1);
        }
      });
      optionsBox.appendChild(div);
    });
    if (optionList.length > 0) {
      optionsBox.classList.add('show');
      if (toggle) toggle.style.transform = 'rotate(180deg)';
    } else {
      optionsBox.classList.remove('show');
      if (toggle) toggle.style.transform = 'rotate(0deg)';
    }
  }

  function getAvailableOptions() {
    if (level) {
      return getOptions(level);
    } else {
      return options || [];
    }
  }

  input.addEventListener('input', () => {
    if (input.disabled) return;
    const search = input.value.toLowerCase();
    const filtered = getAvailableOptions().filter(opt => opt.toLowerCase().includes(search));
    renderOptions(filtered);
  });

  input.addEventListener('focus', () => {
    if (input.disabled) return;
    renderOptions(getAvailableOptions());
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      optionsBox.classList.remove('show');
      if (toggle) toggle.style.transform = 'rotate(0deg)';
    }
  });

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (input.disabled) return;
      const isShown = optionsBox.classList.contains('show');
      if (isShown) {
        optionsBox.classList.remove('show');
        toggle.style.transform = 'rotate(0deg)';
      } else {
        renderOptions(getAvailableOptions());
      }
    });
  }
}

// Инициализация цепочки селекторов с data-level (марка → модель → комплектация)
containers.forEach(container => {
  const level = +container.dataset.level;
  const input = container.querySelector('.custom-input');
  if (level === 1) {
    input.disabled = false; // только первый включён
  } else {
    input.disabled = true;
  }
  initCustomSelect(container);
});

const options_fuel = ["Бензин", "Бензин + Сжиженный газ", "Бензин + Сжиженный природный газ", "Бензин + Электричество", "Водород", "Дизель", "Дизель + электричество", "Не определено", "Сжиженный газ", "Электричество"];
const options_transmission = ["Автомат (все типы)", "Вариатор", "Другое", "Полуавтоматическая", "Ручная"];
const options_body = ["Авто для отдыха (дом на колесах - RV)", "Малолитражное авто", "Малолитражное авто малое", "Микроавтобус", "Пикап", "Прочее", "Седан", "Спортивный авто", "Спортивный внедорожник (SUV)", "Среднеразмерный класс", "Среднеразмерный меньшего класса", "Фургоны"];
const options_color = ["Белый", "Белый двухтонный", "Бирюзовый", "Галактический серый", "Желто-золотой", "Серебристо-серый", "Желтый", "Жемчужный", "Жемчужный двухтонный", "Зеленый", "Золотой", "Золотой двухтонный", "Коричневый", "Коричневый двухтонный", "Красный", "Лаймовый", "Не определен", "Небесно-голубой", "Розовый", "Серебристо-серый", "Серебристый-двухтонный", "Серебряный", "Серый", "Синий", "Сиреневый", "Темно-зеленый", "Темно-серый", "Темно-черный", "Тростниковый", "Фиолетовый", "Черный", "Черный двухтонный", "Яркий серебристый"];
const options_start_year = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004"];
const options_start_month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const options_end_year = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
const options_end_month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const options_mileage_min = ["0", "1 000", "5 000", "10 000", "20 000", "30 000", "40 000", "50 000", "60 000", "70 000", "80 000", "90 000", "100 000", "150 000", "200 000"];
const options_mileage_max = ["0", "1 000", "5 000", "10 000", "20 000", "30 000", "40 000", "50 000", "60 000", "70 000", "80 000", "90 000", "100 000", "150 000", "200 000"];
const options_price_min = ["1 000 000", "1 500 000", "2 000 000", "2 500 000", "3 000 000", "3 500 000", "4 000 000", "4 500 000", "5 000 000", "5 500 000", "6 000 000", "7 000 000", "8 000 000", "9 000 000", "10 000 000"];
const options_price_max = ["1 000 000", "1 500 000", "2 000 000", "2 500 000", "3 000 000", "3 500 000", "4 000 000", "4 500 000", "5 000 000", "5 500 000", "6 000 000", "7 000 000", "8 000 000", "9 000 000", "10 000 000"];

// Инициализация остальных селекторов без data-level, без блокировок
initCustomSelect(document.querySelector('#fuel-type'), options_fuel);
initCustomSelect(document.querySelector('#transmission-type'), options_transmission);
initCustomSelect(document.querySelector('#body-type'), options_body);
initCustomSelect(document.querySelector('#color'), options_color);
initCustomSelect(document.querySelector('#start-prod-year'), options_start_year);
initCustomSelect(document.querySelector('#start-prod-month'), options_start_month);
initCustomSelect(document.querySelector('#end-prod-year'), options_end_year);
initCustomSelect(document.querySelector('#end-prod-month'), options_end_month);
initCustomSelect(document.querySelector('#mileage-min'), options_mileage_min);
initCustomSelect(document.querySelector('#mileage-max'), options_mileage_max);
initCustomSelect(document.querySelector('#price-min'), options_price_min);
initCustomSelect(document.querySelector('#price-max'), options_price_max);
