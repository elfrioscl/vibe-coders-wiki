/**
 * Mapa de zonas horarias IANA a códigos de país ISO 3166-1 alpha-2
 * Enfocado en países hispanohablantes, USA y otros con comunidades hispanas significativas
 */
export const timezoneToCountry: Record<string, string> = {
  // ==========================================
  // ESPAÑA
  // ==========================================
  'Europe/Madrid': 'ES',
  'Atlantic/Canary': 'ES',
  'Africa/Ceuta': 'ES',

  // ==========================================
  // MÉXICO
  // ==========================================
  'America/Mexico_City': 'MX',
  'America/Cancun': 'MX',
  'America/Merida': 'MX',
  'America/Monterrey': 'MX',
  'America/Matamoros': 'MX',
  'America/Chihuahua': 'MX',
  'America/Ciudad_Juarez': 'MX',
  'America/Ojinaga': 'MX',
  'America/Mazatlan': 'MX',
  'America/Bahia_Banderas': 'MX',
  'America/Hermosillo': 'MX',
  'America/Tijuana': 'MX',

  // ==========================================
  // ARGENTINA
  // ==========================================
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Argentina/Cordoba': 'AR',
  'America/Argentina/Salta': 'AR',
  'America/Argentina/Jujuy': 'AR',
  'America/Argentina/Tucuman': 'AR',
  'America/Argentina/Catamarca': 'AR',
  'America/Argentina/La_Rioja': 'AR',
  'America/Argentina/San_Juan': 'AR',
  'America/Argentina/Mendoza': 'AR',
  'America/Argentina/San_Luis': 'AR',
  'America/Argentina/Rio_Gallegos': 'AR',
  'America/Argentina/Ushuaia': 'AR',

  // ==========================================
  // COLOMBIA
  // ==========================================
  'America/Bogota': 'CO',

  // ==========================================
  // CHILE
  // ==========================================
  'America/Santiago': 'CL',
  'America/Punta_Arenas': 'CL',
  'Pacific/Easter': 'CL',

  // ==========================================
  // PERÚ
  // ==========================================
  'America/Lima': 'PE',

  // ==========================================
  // VENEZUELA
  // ==========================================
  'America/Caracas': 'VE',

  // ==========================================
  // ECUADOR
  // ==========================================
  'America/Guayaquil': 'EC',
  'Pacific/Galapagos': 'EC',

  // ==========================================
  // BOLIVIA
  // ==========================================
  'America/La_Paz': 'BO',

  // ==========================================
  // PARAGUAY
  // ==========================================
  'America/Asuncion': 'PY',

  // ==========================================
  // URUGUAY
  // ==========================================
  'America/Montevideo': 'UY',

  // ==========================================
  // CENTROAMÉRICA
  // ==========================================
  'America/Guatemala': 'GT',
  'America/El_Salvador': 'SV',
  'America/Tegucigalpa': 'HN',
  'America/Managua': 'NI',
  'America/Costa_Rica': 'CR',
  'America/Panama': 'PA',

  // ==========================================
  // CARIBE HISPANOHABLANTE
  // ==========================================
  'America/Havana': 'CU',
  'America/Santo_Domingo': 'DO',
  'America/Puerto_Rico': 'PR',

  // ==========================================
  // USA (zonas con mayor población latina)
  // ==========================================
  // Costa Este (NY, FL, NJ, etc.)
  'America/New_York': 'US',
  'America/Detroit': 'US',
  'America/Kentucky/Louisville': 'US',
  'America/Kentucky/Monticello': 'US',
  'America/Indiana/Indianapolis': 'US',
  'America/Indiana/Vincennes': 'US',
  'America/Indiana/Winamac': 'US',
  'America/Indiana/Marengo': 'US',
  'America/Indiana/Petersburg': 'US',
  'America/Indiana/Vevay': 'US',
  'America/Indiana/Tell_City': 'US',
  'America/Indiana/Knox': 'US',
  
  // Centro (Chicago, TX, IL)
  'America/Chicago': 'US',
  'America/Menominee': 'US',
  'America/North_Dakota/Center': 'US',
  'America/North_Dakota/New_Salem': 'US',
  'America/North_Dakota/Beulah': 'US',
  
  // Montaña (CO, AZ, NM)
  'America/Denver': 'US',
  'America/Boise': 'US',
  'America/Phoenix': 'US',
  
  // Pacífico (CA, WA, OR)
  'America/Los_Angeles': 'US',
  
  // Alaska y Hawaii
  'America/Anchorage': 'US',
  'America/Juneau': 'US',
  'America/Sitka': 'US',
  'America/Metlakatla': 'US',
  'America/Yakutat': 'US',
  'America/Nome': 'US',
  'America/Adak': 'US',
  'Pacific/Honolulu': 'US',

  // ==========================================
  // BRASIL (gran comunidad hispanohablante)
  // ==========================================
  'America/Sao_Paulo': 'BR',
  'America/Rio_Branco': 'BR',
  'America/Manaus': 'BR',
  'America/Cuiaba': 'BR',
  'America/Porto_Velho': 'BR',
  'America/Boa_Vista': 'BR',
  'America/Campo_Grande': 'BR',
  'America/Belem': 'BR',
  'America/Fortaleza': 'BR',
  'America/Recife': 'BR',
  'America/Araguaina': 'BR',
  'America/Maceio': 'BR',
  'America/Bahia': 'BR',
  'America/Santarem': 'BR',
  'America/Noronha': 'BR',

  // ==========================================
  // CANADÁ (comunidades hispanas en ciudades grandes)
  // ==========================================
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Halifax': 'CA',
  'America/Montreal': 'CA',
  'America/Regina': 'CA',
  'America/St_Johns': 'CA',

  // ==========================================
  // EUROPA (países con comunidades hispanas)
  // ==========================================
  // Reino Unido
  'Europe/London': 'GB',
  
  // Francia
  'Europe/Paris': 'FR',
  
  // Alemania
  'Europe/Berlin': 'DE',
  
  // Italia
  'Europe/Rome': 'IT',
  
  // Países Bajos
  'Europe/Amsterdam': 'NL',
  
  // Bélgica
  'Europe/Brussels': 'BE',
  
  // Suiza
  'Europe/Zurich': 'CH',
  
  // Portugal
  'Europe/Lisbon': 'PT',
  'Atlantic/Madeira': 'PT',
  'Atlantic/Azores': 'PT',
  
  // Andorra
  'Europe/Andorra': 'AD',
  
  // Irlanda
  'Europe/Dublin': 'IE',

  // ==========================================
  // OTROS
  // ==========================================
  // Guinea Ecuatorial (hispanohablante oficial)
  'Africa/Malabo': 'GQ',
  
  // Filipinas (español histórico)
  'Asia/Manila': 'PH',
  
  // Israel (comunidad hispanohablante)
  'Asia/Jerusalem': 'IL',
  
  // Australia (comunidades latinas en ciudades grandes)
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Adelaide': 'AU',
};



