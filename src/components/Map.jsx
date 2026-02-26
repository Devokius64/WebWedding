import { useEffect, useRef } from 'react';

export default function Map({ center, zoom, address }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // Храним ссылку на карту
  const placemarkRef = useRef(null); // Храним ссылку на метку

  useEffect(() => {
    // Если API еще не загрузилось - выходим
    if (!window.ymaps) return;

    // Если карта уже создана - не создаем новую
    if (mapInstanceRef.current) return;

    // Ждем готовности API
    window.ymaps.ready(() => {
      // Создаем карту только если она еще не создана
      if (!mapInstanceRef.current && mapRef.current) {
        const map = new window.ymaps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
          controls: ['zoomControl', 'fullscreenControl']
        });

        const placemark = new window.ymaps.Placemark(center, {
          hintContent: address,
          balloonContent: address
        }, {
          preset: 'islands#redDotIcon'
        });

        map.geoObjects.add(placemark);
        
        // Сохраняем ссылки
        mapInstanceRef.current = map;
        placemarkRef.current = placemark;
      }
    });

    // Cleanup при размонтировании компонента
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
        placemarkRef.current = null;
      }
    };
  }, []); // Пустой массив зависимостей - выполнится только один раз

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '400px', borderRadius: '12px' }}
      className='max-w-4xl'
    />
  );
}