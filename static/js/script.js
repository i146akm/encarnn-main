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
    'DB11': ['lorem', '4.0 V8 Volante', '5.2 V12 Coupe', '5.2 V12 Coupe AMR'],
    'DB9': ['6.0 V12 Coupe'],
    'DBS': ['5.2 Superleggera Coupe', '5.2 Superleggera Volante', '6.0 V12 Coupe'],
    'DBX': ['4.0 V8', '4.0 V8 707'],
    'Rapide': ['6.0S V12'],
    'Vanquish': ['5.9 V12 Coupe', '6.0 V12 Coupe', '6.0 V12 Volante'],
    'Vantage': ['lorem', 'lorem', 'lorem', 'lorem', 'lorem', 'lorem'],
  },
  "Audi": {
    'A3': ['2.0 TDI Dynamic', '40 TFSI', '40 TFSI Premium', '40 TFSI Quattro Premium', 'Spotback e-tron'],
    'A4': ['30 TDI', '30 TDI Premium', '35 TDI Premium', '35 TDI Quattro Premium', '40 TDI Quattro Premium', '40 TFSI', '40 TFSI Premium', '45 TFSI', '45 TFSI Premium', '45 TFSI Quattro Premium'],
    'A5': ['35 TDI Quattro dynamic Sportback', '35 TDI quattro Premium Sport Back', '35 TDI Quattro Sportback', '35 TDI Sportback', '40 TDI Quattro Premium Coupe', '40 TDI Quattro Premium Sportback', '40 TDI Quattro Sportback', '40 TFSI Quattro Premium Sportback', '40 TFSI Quattro Sportback', '45 TFSI Quattro Cabriolet', '45 TFSI Quattro Coupe', '45 TFSI Quattro Premium Sportback', '45 TFSI Quattro Sportback'],
    'A6': ['35 TDI', '35 TDI Dynamic', '35 TDI Premium', '35 TDI Quattro', '35 TDI Quattro Premium', '35 TDI Quattro Sport', '40 TDI', '40 TDI Premium', '40 TDI Quattro', '40 TDI Quattro Premium', '40 TDI Quattro Sprot', '40 TFSI', '40 TFSI Premium', '40 TFSI Quattro', '40 TFSI Quattro Dynamic', '40 TFSI Quattro Premium', '45 TDI Quattro Premium', '45 TFSI', '45 TFSI Premium', '45 TFSI Quattro', '45 TFSI Quattro Premium', '50 TDI Quattro Premium', '50 TFSI Quattro Sport', '55 TDI Quattro Premium', '55 TDI Quattro Sport'],
    'A7': ['40 TDI', '40 TDI Premium', '40 TFSI Quattro Premium', '40 TFSI Quattro Sport', '45 TDI Quattro Preimum', '45 TDI Quattro Premium', '45 TDI Quattro Premium', '50 TDI Quattro Premium', '50 TDI Quattro Sport', '50 TDI Quattrp Premium', '50 TFSI Quattro Premium', '55 TDI Quattro', '55 TDI Quattro Dynamic', '55 TDI Quattro Premium', '55 TDI Quattro Sport', '55 TFSI e Quattro Premium', '55 TFSI e 콰트로 프리미엄', '55 TFSI Quattro Preimum', '55 TFSI Quattro Premium'],
    'A8': ['50 TDI Quatrro Exclusive', '50 TDI Quattro', '50 TDI Quattro Design LWB', '50 TDI Quattro LWB', '50 TDI Quattro Premium', '55 TFSI Quattro LWB', '55 TFSI Quattro Premium LWB', '55 TFSI Quattro SWB', '60 TFSI Quattro LWB'],
    'e-tron GT': ['GT quattro', 'GT quattro Premium'],
    'Q2': ['1.0 TFSI', '35 TDI', '35 TDI Premium'],
    'Q3': ['35 TDI', '35 TDI Premium', '35 TDI Premium Sportback', '35 TDI Quattro Design Line', '35 TDI Quattro Premium', '35 TDI Quattro Premium Sportback'],
    'Q4': ['e-Tron 40', 'e-Tron 40 Premium', 'e-Tron 40 Premium Sportback', 'e-Tron 40 Sportback'],
    'Q4 e-tron': ['40', '40 Premium', '40 Premium Sportback', '40 Sportback', '45', '45 Premium'],
    'Q5': ['3.0 TDI Quattro Dynamic', '35 TDI Quattro', '40 TDI Quattro Premium', '40 TDI Quattro Premium Sportback', '40 TDI Quattro Sportback', '45 TDI Quattro', '45 TDI Quattro Dynamic', '45 TFSI Quattro', '45 TFSI Quattro Premium', '45 TFSI Quattro Premium Sportback', '45 TFSI Quattro Sportback', '50 TDI Quattro Premium'],
    'Q7': ['3.0 TFSI Quattro', '35 TDI Quattro', '35 TDI Quattro Comport', '35 TDI Quattro Premium', '35 TDI Quattro Premium Tech', '45 TDI Quattro', '45 TDI Quattro Premium', '45 TDI Quattro Sport', '45 TFSI Quattro', '50 TDI Quattro', '50 TDI Quattro Exclusive', '55 TFSI Quattro', '55 TFSI Quattro Premium'],
    'Q8': ['45 TDI Quattro', '45 TDI Quattro Premium', '50 TDI Quattro', '50 TDI Quattro Exclusive', '50 TDI Quattro Premium', '55 TFSI Quattro Premium'],
    'Q8 e-tron': ['55 Quattro', '55 Quattro Premium', '55 Quattro Premium Sportback', '55 Quattro Sportback'],
    'R8': ['5.2 V10 Performance Coupe', '5.2 V10 Performance RWD Spyder', '5.2 V10 Performance Spyder', '5.2 V10 Plus Coupe', '5.2 V10 Spyder'],
    'RS e-tron GT': ['GT RS'],
    'RS3': ['2.5 TFSI Quattro'],
    'RS5': ['2.9 TFSI Quattro'],
    'RS6': ['4.0 TFSI Quattro Avant', '4.0 TFSI Quattro Avant Performance'],
    'RS7': ['4.0 TFSI Quattro', '4.0 TFSI Quattro Performance'],
    'RSQ8': ['4.0 TFSI Quattro', '4.0 TFSI Quattro Performance'],
    'S3': ['2.0 TFSI Quattro'],
    'S4': ['3.0 TFSI Quattro'],
    'S5': ['3.0 TFSI Quattro', '3.0 TFSI 콰트로'],
    'S6': ['3.0 TDI Quattro', '4.0 TFSI quattro'],
    'S7': ['3.0 TDI Quattro', '4.0 TFSI quattro'],
    'S8': ['4.0 TFSI Quattro LWB', '4.0 TFSI Quattro Plus'],
    'SQ5': ['3.0 TDI Quattro', '3.0 TFSI Quattro', '3.0 TFSI Quattro Sportback'],
    'SQ7': ['4.0 TFSI Quattro'],
    'SQ8': ['4.0 TDI Quattro'],
    'TTRS': ['Coupe 2.5 TFSI quattro'],
    'TTS': ['Coupe 2,0 TFSI Quattro'],
  },
  "Bentley": {
    'Bentayga': ['3.0 Plug-in HEV', '4.0 V8', '4.0 V8 Azure', '4.0 V8 Base', '4.0 V8 EWB Azure', '4.0 V8 EWB First Edition', '4.0 V8 S', '4.0 V8 S Black Edition', ],
    'Continental': ['4.0 GT', '4.0 GT Azure', '4.0 GT S', '4.0 GTC', '4.0 GTS', '6.0 GT', '6.0 GT Speed', '6.0 GTC', '6.0 GTC Speed', ],
    'Flying Spur': ['4.0', '4.0 Azure', '4.0 S', '6.0', '6.0 Black Edition', '6.0 S'],
    'Mulsanne': ['6.8', '6.8 EWB', '6.8 Speed'],
  },
  "Mercedes-Benz": {
    'B-Class': ['B180', 'B200', 'B220d', 'B250e', 'B250 4MATIC'],
    'C-Class': ['C200', 'C220d', 'C300', 'C300e', 'C43AMG', 'C63SAMG'],
    'CLA-Class': ['CLA200', 'CLA220d', 'CLA250', 'CLA35AMG', 'CLA45SAMG'],
    'CLE-Class': ['CLE300', 'CLE450', 'CLE53AMG'],
    'CLS-Class': ['CLS350', 'CLS450', 'CLS53AMG'],
    'E-Class': ['E200', 'E220d', 'E300e', 'E350', 'E400d', 'E53AMG', 'E63SAMG'],
    'EQA': ['EQA250', 'EQA300 4MATIC', 'EQA350 4MATIC'],
    'EQB': ['EQB250+', 'EQB300 4MATIC', 'EQB350 4MATIC'],
    'EQC': ['EQC400 4MATIC'],
    'EQE': ['EQE350+', 'EQE350 4MATIC', 'EQE500 4MATIC', 'EQEAMG'],
    'EQS': ['EQS450+', 'EQS450 4MATIC', 'EQS580 4MATIC', 'EQSAMG'],
    'G-Class': ['G550', 'G580e', 'G63AMG', 'G63AMG 4x4²'],
    'GL-Class': ['GL350', 'GL450', 'GL550', 'GL63AMG'],
    'GLA-Class': ['GLA200', 'GLA250', 'GLA250 4MATIC', 'GLA35AMG'],
    'GLB-Class': ['GLB200', 'GLB250', 'GLB250 4MATIC', 'GLB35AMG'],
    'GLC-Class': ['GLC200', 'GLC220d', 'GLC300', 'GLC300 4MATIC', 'GLC43AMG'],
    'GLE-Class': ['GLE300d', 'GLE350', 'GLE350 4MATIC', 'GLE450', 'GLE450 4MATIC', 'GLE580 4MATIC', 'GLE63SAMG'],
    'GLS-Class': ['GLS450', 'GLS580', 'GLS600 Maybach', 'GLS63AMG'],
    'My B': ['MaybachS580', 'MaybachS680', 'MaybachGLS600'],
    'Others': ['A180', 'A200', 'A250', 'A35AMG', 'A45SAMG'],
    'S-Class': ['S350d', 'S450', 'S500', 'S580', 'S580e', 'S63AMG'],
    'SL-Class': ['SL43AMG', 'SL55AMG', 'SL63AMG'],
    'SLC-Class': ['SLC180', 'SLC200', 'SLC300', 'SLC43AMG'],
    'SLK-Class': ['SLK200', 'SLK250', 'SLK350', 'SLK55AMG'],
    'Sprinter': ['Sprinter2500', 'Sprinter3500', 'Sprinter3500XD'],
    'V-Class': ['V220d', 'V250d', 'V300d']
  },
  "BMW": {
  "1-Series": ["116i", "118i", "120i", "128ti", "M135i xDrive", "116d", "118d", "120d"],
  "2-Series": ["218i", "220i", "230i", "M235i xDrive", "218d", "220d", "225xe", "M240i xDrive"],
  "3-Series": ["318i", "320i", "330i", "330e", "M340i xDrive", "318d", "320d", "330d", "M3 Competition"],
  "4-Series": ["420i", "430i", "M440i xDrive", "420d", "430d", "M4 Competition"],
  "5-Series": ["520i", "530i", "540i xDrive", "530e", "M550i xDrive", "520d", "530d", "M5 Competition"],
  "6-Series": ["630i", "640i xDrive", "640d xDrive", "M6 Gran Coupe"],
  "7-Series": ["740i", "750e xDrive", "760i xDrive", "M760e xDrive", "i7 eDrive50", "i7 xDrive60", "i7 M70 xDrive"],
  "8-Series": ["840i", "840i xDrive", "M850i xDrive", "840d xDrive", "M8", "M8 Competition", "Alpina B8"],
  "Gran Turismo": ["320i GT", "330i GT", "340i GT", "320d GT", "330d GT"],
  "i3": ["i3 120 Ah", "i3s 120 Ah", "i3 REx", "i3s REx"],
  "i4": ["i4 eDrive35", "i4 eDrive40", "i4 xDrive40", "i4 M50"],
  "i5": ["i5 eDrive40", "i5 xDrive40", "i5 M60 xDrive"],
  "i7": ["i7 eDrive50", "i7 xDrive60", "i7 M70 xDrive"],
  "i8": ["i8 Coupe", "i8 Roadster"],
  "iX": ["iX xDrive40", "iX xDrive50", "iX M60"],
  "iX1": ["iX1 xDrive30"],
  "iX3": ["iX3 M Sport"],
  "M2": ["M2 Coupe", "M2 Competition", "M2 CS"],
  "M3": ["M3 Sedan", "M3 Competition", "M3 Competition xDrive", "M3 CS"],
  "M4": ["M4 Coupe", "M4 Competition", "M4 Competition xDrive", "M4 CSL"],
  "M5": ["M5 Sedan", "M5 Competition", "M5 CS"],
  "M6": ["M6 Coupe", "M6 Gran Coupe", "M6 Convertible"],
  "M8": ["M8 Coupe", "M8 Competition Coupe", "M8 Gran Coupe", "M8 Competition Gran Coupe", "M8 Convertible", "M8 Competition Convertible"],
  "X1": ["sDrive18i", "xDrive20i", "xDrive25e", "xDrive28i", "xDrive30e"],
  "X2": ["sDrive20i", "xDrive20i", "xDrive25e", "M35i xDrive"],
  "X3": ["sDrive20i", "xDrive20i", "xDrive30i", "xDrive30e", "xDrive30d", "M40i", "X3 M"],
  "X3M": ["X3 M", "X3 M Competition"],
  "X4": ["xDrive20i", "xDrive30i", "xDrive30d", "M40i", "X4 M"],
  "X4M": ["X4 M", "X4 M Competition"],
  "X5": ["xDrive40i", "xDrive45e", "xDrive50i", "xDrive30d", "xDrive40d", "M50i", "X5 M"],
  "X5M": ["X5 M", "X5 M Competition"],
  "X6": ["xDrive40i", "xDrive50i", "xDrive30d", "xDrive40d", "M50i", "X6 M"],
  "X6M": ["X6 M", "X6 M Competition"],
  "X7": ["xDrive40i", "xDrive50i", "xDrive30d", "xDrive40d", "M60i xDrive", "X7 M60i"],
  "XM": ["XM", "XM Label Red"],
  "Z4": ["sDrive20i", "sDrive30i", "M40i"]
},
    "Hyundai": {
        'Elantra': ['1.6 MPI', '2.0 MPI', '1.6 GDI Hybrid', 'N Line'],
        'Sonata': ['2.0', '2.5 GDI', '1.6 Turbo', 'Hybrid', 'N Line'],
        'Tucson': ['2.0', '2.5 GDI', '1.6 Turbo', 'Hybrid', 'Plug-in Hybrid'],
        'Santa Fe': ['2.2 CRDi', '2.5 GDI', '1.6 Turbo Hybrid', 'Plug-in Hybrid'],
        'Kona': ['1.6 Turbo', '2.0 MPI', 'Electric', 'Hybrid', 'N'],
        'Palisade': ['3.5 GDI', '2.2 Diesel', '3.8 V6'],
        'Creta': ['1.6 MPI', '1.5 CRDi', '1.4 Turbo GDI']
    },
            "Kia": {
        'Rio': ['1.4 MPI', '1.6 MPI', '1.0 T-GDI'],
        'Cerato': ['1.6 MPI', '2.0 MPI', '1.6 GDI', '1.6 Turbo'],
        'K5': ['2.0 MPI', '2.5 GDI', '1.6 Turbo', 'Hybrid'],
        'Morning': [
    "Trendy",
    "Prestige",
    "Signature",
    "GT-Line",
    "GT",
    "Trendy VAN",
    "Prestige VAN",
    "Smart",
    "Deluxe",
    "Luxury",
    "Sports"
],
        'Sportage': ['2.0 MPI', '2.5 GDI', '1.6 Turbo', 'Hybrid', 'Plug-in Hybrid'],
        'Sorento': ['2.2 CRDi', '2.5 GDI', '1.6 Turbo Hybrid', 'Plug-in Hybrid'],
        'Seltos': ['1.6 MPI', '2.0 MPI', '1.6 Turbo', '1.6 Diesel'],
        'Stinger': ['2.0 Turbo', '2.5 Turbo', '3.3 V6 Twin-Turbo'],
        'EV6': ['Standard Range', 'Long Range', 'GT'],
        'Carnival': ['2.2 CRDi', '3.5 V6', '3.5 LPI'],
        'Mohave': ['3.0 V6 Diesel']
    },

    "Cadillac": {
    'CT4': ['2.0 Turbo', 'CT4-V'],
    'CT5': ['2.0 Turbo', 'CT5-V', 'Blackwing'],
    'XT4': ['2.0 Turbo'],
    'XT5': ['2.0 Turbo', '3.6 V6'],
    'XT6': ['2.0 Turbo', '3.6 V6'],
    'Escalade': ['6.2 V8', 'Escalade-V']
}
,
    "Chevrolet": {
    'Spark': ['1.0', '1.2', 'EV'],
    'Aveo': ['1.4', '1.6'],
    'Cruze': ['1.6', '1.8', '2.0 Diesel'],
    'Malibu': ['1.5 Turbo', '2.0 Turbo', 'Hybrid'],
    'Captiva': ['2.4', '3.0 V6', '2.2 Diesel'],
    'Equinox': ['1.5 Turbo', '2.0 Turbo'],
    'Tahoe': ['5.3 V8', '6.2 V8'],
    'Camaro': ['2.0 Turbo', '3.6 V6', '6.2 V8 SS']
}
,
    "Chrysler": {
    '300': ['3.6 V6', '5.7 HEMI V8'],
    'Pacifica': ['3.6 V6', 'Hybrid'],
    'Voyager': ['3.6 V6']
}
,
    "Citroen / DS": {
    'C3': ['1.2 PureTech', '1.5 BlueHDi'],
    'C4': ['1.2 PureTech', '1.5 BlueHDi', 'e-C4'],
    'C5 Aircross': ['1.6 PureTech', '1.5 BlueHDi', 'Hybrid'],
    'Berlingo': ['1.2', '1.5 Diesel', 'Electric'],
    'DS3': ['1.2 PureTech', 'E-Tense'],
    'DS7': ['1.6 Hybrid', 'E-Tense AWD']
}
,
    "Daihatsu": {
    'Mira': ['660cc', 'e:S', 'Custom'],
    'Move': ['660cc', 'Conte', 'Canbus'],
    'Tanto': ['660cc', 'Custom'],
    'Hijet': ['Cargo', 'Truck', 'Deck Van'],
    'Cast': ['Style', 'Activa', 'Sport']
}
,
    "Dodge": {
    'Charger': ['3.6 V6', '5.7 V8', 'SRT Hellcat'],
    'Challenger': ['3.6 V6', '5.7 V8', 'SRT Hellcat'],
    'Durango': ['3.6 V6', '5.7 V8', 'SRT'],
    'Journey': ['2.4', '3.6 V6'],
    'Ram': ['1500', '2500', '3500']
}
,
    "Dongfeng": {
    'Fengon 580': ['1.5 Turbo', 'CVT'],
    'Fengon ix5': ['1.5 Turbo', 'CVT'],
    'Rich 6': ['2.4 Gasoline', '2.5 Diesel'],
    'Aeolus AX7': ['1.6 Turbo', '6AT']
}
,
    "Ferrari": {
    '488': ['GTB', 'Spider', 'Pista'],
    'F8': ['Tributo', 'Spider'],
    'Roma': ['3.9 V8'],
    'SF90': ['Stradale', 'Spider'],
    '296': ['GTB', 'GTS'],
    'Purosangue': ['6.5 V12']
}
,
    "Fiat": {
    '500': ['1.2', 'TwinAir', 'Electric'],
    'Panda': ['1.0 Hybrid', '1.2'],
    'Tipo': ['1.0', '1.6 Diesel'],
    'Doblo': ['1.6 Diesel'],
    'Fiorino': ['1.3 Multijet']
}
,
    "Polestar": {
    '1': ['Hybrid'],
    '2': ['Standard', 'Long Range', 'Dual Motor'],
    '3': ['Dual Motor']
}
,
    "Ford": {
    'Focus': ['1.6', '1.5 EcoBoost', '2.0'],
    'Fusion (Mondeo)': ['1.5 EcoBoost', '2.0 Hybrid'],
    'Escape (Kuga)': ['1.5 EcoBoost', '2.0 EcoBoost', 'Hybrid'],
    'Explorer': ['2.3 EcoBoost', '3.0 V6', 'Hybrid'],
    'Edge': ['2.0 EcoBoost', '2.7 EcoBoost'],
    'Mustang': ['2.3 EcoBoost', '5.0 V8', 'Mach-E']
}
,
    "Genesis": {
    'G70': ['2.0 Turbo', '3.3 Turbo'],
    'G80': ['2.5 Turbo', '3.5 Turbo', 'EV'],
    'G90': ['3.5 Turbo', '5.0 V8'],
    'GV70': ['2.5 Turbo', '3.5 Turbo', 'EV'],
    'GV80': ['2.5 Turbo', '3.5 Turbo'],
    'GV60': ['Standard AWD', 'Performance AWD']
}
,
    "GMC": {
    'Terrain': ['1.5 Turbo', '2.0 Turbo'],
    'Acadia': ['2.5', '3.6 V6'],
    'Yukon': ['5.3 V8', '6.2 V8'],
    'Sierra': ['1500', '2500 HD', '3500 HD'],
    'Hummer EV': ['Pickup', 'SUV']
}
,
    "Honda": {
    'Civic': ['1.5 Turbo', '2.0 i-VTEC', 'Type R'],
    'Accord': ['1.5 Turbo', '2.0 Turbo', 'Hybrid'],
    'CR-V': ['2.0', '2.4', '1.5 Turbo', 'Hybrid'],
    'HR-V': ['1.5', '1.8', 'Hybrid'],
    'Fit': ['1.3', '1.5', 'Hybrid'],
    'Stepwgn': ['2.0', '2.0 Hybrid', 'Spada'],
    'Odyssey': ['2.4', '3.5 V6', 'Hybrid']
},

    "Infiniti": {
    'Q50': ['2.0 Turbo', '3.0t V6', 'Hybrid'],
    'Q60': ['2.0 Turbo', '3.0t Coupe'],
    'QX50': ['2.0 VC-Turbo'],
    'QX60': ['3.5 V6', 'Hybrid'],
    'QX80': ['5.6 V8']
}
,
    "Isuzu": {
    'D-Max': ['1.9 Diesel', '3.0 Diesel'],
    'MU-X': ['1.9 Diesel', '3.0 Diesel'],
    'Elf': ['N-Series', '3.0 Diesel'],
    'Forward': ['F-Series', '6HK1 Diesel']
}
,
    "Jaguar": {
    'XE': ['2.0', '2.0D', 'PHEV'],
    'XF': ['2.0', '2.0D'],
    'F-Pace': ['2.0', '3.0', 'SVR'],
    'E-Pace': ['1.5 PHEV', '2.0'],
    'I-Pace': ['EV400 AWD'],
    'F-Type': ['P300', 'P450', 'R']
}
,
    "Jeep": {
    'Renegade': ['1.3 Turbo', '1.6 Diesel', 'Plug-in Hybrid'],
    'Compass': ['2.4', '1.3 Turbo', '4xe'],
    'Cherokee': ['2.0 Turbo', '3.2 V6'],
    'Grand Cherokee': ['3.6 V6', '5.7 V8', '4xe Plug-in'],
    'Wrangler': ['2.0 Turbo', '3.6 V6', 'Rubicon'],
    'Gladiator': ['3.6 V6']
}
,


    "Lamborghini": {},
    "Land Rover": {
    'Defender': ['2.0 P300', '3.0 P400', '5.0 V8'],
    'Discovery': ['2.0', '3.0 MHEV'],
    'Discovery Sport': ['2.0', 'PHEV'],
    'Range Rover Evoque': ['2.0', 'PHEV'],
    'Range Rover Velar': ['2.0', '3.0 MHEV'],
    'Range Rover Sport': ['3.0 MHEV', 'PHEV', '5.0 V8'],
    'Range Rover': ['3.0 MHEV', 'PHEV', '4.4 V8']
}
,
    "Lexus": {
    'IS': ['IS200t', 'IS250', 'IS300h'],
    'ES': ['ES200', 'ES250', 'ES300h'],
    'RX': ['RX350', 'RX450h', 'RX500h F Sport'],
    'NX': ['NX200', 'NX250', 'NX350h'],
    'UX': ['UX200', 'UX250h'],
    'LS': ['LS500', 'LS500h'],
    'LX': ['LX570', 'LX600']
}
,
    "Lincoln": {
    'Corsair': ['2.0 Turbo', 'Grand Touring PHEV'],
    'Nautilus': ['2.0 Turbo', '2.7 V6'],
    'Aviator': ['3.0 V6', 'Grand Touring PHEV'],
    'Navigator': ['3.5 Twin-Turbo V6'],
    'MKZ': ['2.0', 'Hybrid'],
    'MKC': ['2.0', '2.3 Turbo']
}
,
    "Lotus": {},
    "Maserati": {
    'Ghibli': ['2.0 Hybrid', '3.0 V6', 'Trofeo V8'],
    'Quattroporte': ['3.0 V6', 'Trofeo V8'],
    'Levante': ['2.0 Hybrid', '3.0 V6', 'Trofeo'],
    'Grecale': ['GT', 'Modena', 'Trofeo'],
    'MC20': ['3.0 V6 Nettuno']
}
,
    "Mazda": {
    'Mazda2': ['1.5', 'Hybrid'],
    'Mazda3': ['1.5', '2.0 Skyactiv', '2.5 Turbo'],
    'Mazda6': ['2.0', '2.5', '2.5 Turbo'],
    'CX-3': ['2.0'],
    'CX-30': ['2.0', '2.5'],
    'CX-5': ['2.0', '2.5', '2.2 Diesel'],
    'CX-60': ['2.5 Hybrid', '3.3 Diesel'],
    'MX-5': ['1.5', '2.0 Roadster']
}
,
    "McLaren": {
    '570S': ['Coupe', 'Spider'],
    '600LT': ['Coupe', 'Spider'],
    '720S': ['Coupe', 'Spider'],
    'Artura': ['Hybrid V6'],
    'GT': ['4.0 V8'],
    'P1': ['Hybrid'],
    '765LT': ['Coupe', 'Spider']
}
,
    "Mini": {
    'Cooper': ['One', 'Cooper', 'Cooper S', 'John Cooper Works'],
    'Clubman': ['Cooper', 'Cooper S'],
    'Countryman': ['Cooper', 'Cooper S', 'PHEV'],
    'Convertible': ['Cooper', 'Cooper S'],
    'Electric': ['Mini Cooper SE']
}
,
    "Nissan": {
    'Altima': ['2.5', '2.0 Turbo', 'Hybrid'],
    'Maxima': ['3.5 V6'],
    'Sentra': ['1.6', '2.0'],
    'X-Trail': ['2.0', '2.5', 'Hybrid'],
    'Qashqai': ['1.2 Turbo', '1.6', '1.6 dCi'],
    'Murano': ['3.5 V6'],
    'Leaf': ['40 kWh', '62 kWh (Leaf e+)']
}
,
    "Peugeot": {
    '208': ['1.2 PureTech', 'e-208'],
    '308': ['1.2 PureTech', '1.5 BlueHDi'],
    '3008': ['1.6 PureTech', '1.5 BlueHDi', 'Hybrid4'],
    '5008': ['1.6 PureTech', '2.0 BlueHDi'],
    '2008': ['1.2 PureTech', 'e-2008'],
    'Expert': ['2.0 BlueHDi', 'Electric']
}
,
    "Porsche": {
    '911': ['Carrera', 'Carrera S', 'Turbo', 'Turbo S'],
    'Cayenne': ['Base', 'S', 'GTS', 'Turbo', 'E-Hybrid'],
    'Macan': ['Base', 'S', 'GTS', 'Turbo'],
    'Panamera': ['4', '4S', 'Turbo', 'E-Hybrid'],
    'Taycan': ['4S', 'Turbo', 'Turbo S', 'Cross Turismo'],
    '718': ['Boxster', 'Cayman', 'GTS', 'Spyder']
}
,
    "Renault": {
    'Clio': ['1.0 TCe', '1.5 dCi', 'Hybrid'],
    'Captur': ['1.0 TCe', '1.3 TCe', 'PHEV'],
    'Megane': ['1.3 TCe', '1.5 dCi', 'E-Tech'],
    'Arkana': ['1.3 TCe', 'E-Tech'],
    'Koleos': ['2.0 dCi', '2.5'],
    'Talisman': ['1.6 TCe', '1.6 dCi'],
    'Duster (Rebadged)': ['1.3 TCe', '1.5 dCi']
}
,
    "Renault-Korea": {
    'SM3': ['1.6', 'Electric'],
    'SM5': ['2.0'],
    'SM6': ['1.6 Turbo', '2.0'],
    'QM3': ['1.5 dCi'],
    'QM5': ['2.0 dCi'],
    'QM6': ['2.0 GDi', 'LPG']
}
,
    "Rolls-Royce": {
    'Phantom': ['Standard', 'Extended'],
    'Ghost': ['V12'],
    'Wraith': ['V12 Coupe'],
    'Dawn': ['V12 Convertible'],
    'Cullinan': ['V12 SUV'],
    'Spectre': ['Electric Coupe']
}
,
    "Smart": {
    'ForTwo': ['Gasoline', 'Electric Drive'],
    'ForFour': ['Gasoline', 'Electric Drive'],
    '#1': ['Electric'],
    '#3': ['Electric']
}
,
    "Ssangyong": {
    'Tivoli': ['1.5 Turbo', '1.6 Diesel'],
    'Korando': ['1.5 Turbo', '1.6 Diesel'],
    'Rexton': ['2.2 Diesel'],
    'Musso': ['2.2 Diesel'],
    'Actyon': ['2.0 Diesel']
}
,
    "Suzuki": {
    'Swift': ['1.2', '1.4 Boosterjet', 'Hybrid'],
    'Vitara': ['1.4 Boosterjet', 'Hybrid'],
    'Jimny': ['1.5'],
    'SX4': ['1.4 Turbo', 'Hybrid'],
    'Ignis': ['1.2 Hybrid']
}
,
    "Tesla": {
    'Model 3': ['Standard Range Plus', 'Long Range', 'Performance'],
    'Model Y': ['Long Range', 'Performance'],
    'Model S': ['Dual Motor', 'Plaid'],
    'Model X': ['Dual Motor', 'Plaid'],
    'Cybertruck': ['Dual Motor', 'Tri Motor (AWD)']
}
,
    "Toyota": {
    'Corolla': ['1.6', '1.8 Hybrid', '2.0 Hybrid', 'GR Sport'],
    'Camry': ['2.0', '2.5', '3.5 V6', '2.5 Hybrid'],
    'RAV4': ['2.0', '2.5 Hybrid', '2.5 Plug-in Hybrid', 'Adventure'],
    'Land Cruiser': ['3.5 Twin-Turbo V6', '4.0 V6', 'Diesel 2.8 D-4D', 'GR Sport'],
    'Hilux': ['2.4 D-4D', '2.8 D-4D', 'Revo', 'GR Sport'],
    'C-HR': ['1.8 Hybrid', '2.0 Hybrid', 'GR Sport'],
    'Yaris': ['1.0', '1.5', '1.5 Hybrid', 'GR Yaris'],
    'Highlander': ['3.5 V6', '2.5 Hybrid', 'Platinum'],
    'Prius': ['1.8 Hybrid', 'Plug-in Hybrid', '2.0 Hybrid AWD'],
    'Crown': ['2.5 Hybrid', '2.4 Turbo Hybrid', 'Crossover', 'Sedan']
},

    "Volkswagen": {
    'Golf': ['1.4 TSI', '2.0 GTI', '2.0 R', 'e-Golf'],
    'Polo': ['1.0 MPI', '1.0 TSI'],
    'Passat': ['1.8 TSI', '2.0 TDI', 'GTE'],
    'Tiguan': ['1.4 TSI', '2.0 TDI', 'eHybrid'],
    'Touareg': ['3.0 TDI', 'eHybrid'],
    'Jetta': ['1.4 TSI', 'GLI'],
    'Arteon': ['2.0 TSI', '2.0 TDI'],
    'ID.3': ['Pure', 'Pro', 'Pro S'],
    'ID.4': ['Pure', 'Pro', 'GTX'],
    'Multivan': ['2.0 TDI', 'eHybrid'],
    'Transporter': ['2.0 TDI']
}
,
    "Volvo": {
    'XC40': ['T3', 'T5', 'Recharge PHEV', 'Recharge EV'],
    'XC60': ['B5', 'B6', 'Recharge PHEV'],
    'XC90': ['B6', 'Recharge PHEV'],
    'S60': ['T5', 'B5', 'Recharge'],
    'S90': ['B6', 'Recharge'],
    'V60': ['B4', 'Recharge', 'Cross Country'],
    'V90': ['B6', 'Cross Country'],
    'C40': ['Recharge EV']
}
,
    "Прочие бренды": {
    'Others': ['Others'],
    }
}
document.querySelectorAll('input').forEach(input => {
  input.setAttribute('autocomplete', 'off')
});

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
  containers[level - 1].querySelector('.custom-options').innerHTML = '';

  // Заполняем опции, если есть
  const options = getOptions(level);
  const optionsContainer = containers[level - 1].querySelector('.custom-options');
  optionsContainer.innerHTML = options.map(opt => `<div class="custom-option">${opt}</div>`).join('');
}

function resetBelow(level) {
  for (let i = level; i < containers.length; i++) {
    const input = containers[i].querySelector('.custom-input');
    input.value = '';
    input.disabled = true;
    containers[i].querySelector('.custom-options').innerHTML = '';
  }
}

// Проверка при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  const brandInput = containers[0].querySelector('.custom-input');
  const modelInput = containers[1].querySelector('.custom-input');

  if (brandInput.value && data[brandInput.value]) {
    enableLevel(2);

    if (modelInput.value && data[brandInput.value][modelInput.value]) {
      enableLevel(3);
    }
  }
});


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

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

  function toggleSortMenu() {
    const menu = document.getElementById('sortMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  document.addEventListener('click', function(event) {
    const menu = document.getElementById('sortMenu');
    const button = document.querySelector('.sort-button');
    if (!button.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
'lorem', 'lorem', 'lorem', 'lorem', 'lorem', 'lorem', 'lorem', 'lorem', 'lorem',
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



document.addEventListener('DOMContentLoaded', () => {
  const clearBtn = document.querySelector('#clear-filters');
  const filterForm = document.querySelector('#filter_form');

  clearBtn.addEventListener('click', () => {
    filterForm.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
    filterForm.querySelectorAll('.custom-select-container').forEach(container => {
      container.classList.remove('active', 'open');
    });
  });
});
