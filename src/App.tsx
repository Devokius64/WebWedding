import backgroundImage from "./assets/photo_2025-08-30_19-21-49.jpg";
import backgroundImage2 from "./assets/generated_image_1578fc06-29e5-4ec7-90d8-469d2870c997.jpg";
import backgroundImage3 from "./assets/vual2.jpg";
import calendarIcon from "./assets/fi-rr-calendar.svg";
import clockIcon from "./assets/fi-rr-clock.svg";
import cat from "./assets/mewo-omori.gif"
import locationIcon from "./assets/fi-rr-navigation.svg";
import couplePhoto from "./assets/04c07cf47e89fee765cb2932427d43327a77362a.png";
import { useState, useEffect } from "react";
import Map from './components/Map.jsx';

export default function App() {
  const coordinates = [55.388221, 36.731507];
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    attendance: "",
    allergies: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(
        "2026-08-29T14:00:00",
      ).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
              (1000 * 60 * 60),
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          ),
          seconds: Math.floor(
            (difference % (1000 * 60)) / 1000,
          ),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

useEffect(() => {
    // Функция создания виджета
    const createWidget = () => {
      if (!window.YaTravelAffiliate) return;

      window.YaTravelAffiliate.createWidget({
        type: "hotelsSet",                          // Тип виджета - подборка отелей
        containerId: "hotels-widget",               // ID контейнера
        widgetParams: {
          title: "Отели для наших гостей",          // Заголовок
          slugs: [
            "naro-fominsk/fabrikant",             // ID отеля 1 (замени на реальные!)
            "naro-fominsk/artman",              // ID отеля 2
            "moscow-oblast/otel-voiazh"            // ID отеля 3
          ]
        },
        theme: "light"                                // Светлая тема
      });
    };

    // Загружаем скрипт виджета
    if (!document.querySelector('script[src*="travel.ya.ru/widgets/api.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://aflt.travel.ya.ru/widgets/api.js';
      script.async = true;
      
      script.onload = () => {
        // Скрипт загружен - ждем готовность API
        if (window.YaTravelAffiliate) {
          createWidget();
        } else {
          window.addEventListener('YaTravelAffiliateLoaded', createWidget, { once: true });
        }
      };
      
      document.head.appendChild(script);
    } else {
      // Скрипт уже загружен
      if (window.YaTravelAffiliate) {
        createWidget();
      } else {
        window.addEventListener('YaTravelAffiliateLoaded', createWidget, { once: true });
      }
    }

    // Cleanup при размонтировании
    return () => {
      window.removeEventListener('YaTravelAffiliateLoaded', createWidget);
    };
  }, []); // Пустой массив - выполнится 1 раз при загрузке


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError("");

  try {
    // Создаём объект FormData и добавляем поля с entry ID
    const formDataToSend = new FormData();
    formDataToSend.append("entry.221922053", formData.fullName);   // замени на свои entry
    formDataToSend.append("entry.1815464586", formData.phone);
    formDataToSend.append("entry.1753882051", formData.email);
    formDataToSend.append("entry.903989764", formData.attendance);
    formDataToSend.append("entry.188762807", formData.allergies);

    // Отправляем POST-запрос на action URL формы
    const response = await fetch("https://docs.google.com/forms/d/e/1FAIpQLScEweKCzx07mN-vEJEYygXljwUdfF3xOm5OsDRua_CWngboAQ/formResponse", {
      method: "POST",
      mode: "no-cors", // важно! Google Forms не возвращает CORS-заголовки
      body: formDataToSend,
    });

    // Из-за mode: "no-cors" мы не можем прочитать ответ, но запрос уходит
    // Считаем, что отправка успешна, если не было ошибки сети
    setSubmitSuccess(true);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      attendance: "",
      allergies: "",
    });
    setTimeout(() => setSubmitSuccess(false), 3000);
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    setSubmitError("Не удалось отправить. Попробуйте позже.");
  } finally {
    setIsSubmitting(false);
  }
};
      
    




  return (

    


    <div className="min-h-screen">
      {/* Hero section with background image */}
      <div
        className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h1
            className="text-6xl md:text-8xl mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
          >
            <br /><br /><br /><br /><br /><br /><br /><br />
            Екатерина
          </h1>
          <div
            className="text-5xl md:text-7xl mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
          >
            &
          </div>
          <h1
            className="text-6xl md:text-8xl mb-8"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
          >
            Кирилл
          </h1>
          <div
            className="flex items-center justify-center gap-4 text-xl md:text-2xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
          >
            <div className="flex-1 max-w-[100px] h-px bg-white"></div>
            <span>29.08.2026</span>
            <div className="flex-1 max-w-[100px] h-px bg-white"></div>
          </div>
        </div>
      </div>

      {/* White section with invitation text */}
      <div className=" py-32 px-8 relative" >
      <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ 
      backgroundImage: `url(${backgroundImage2})`,
      opacity: 0.5
    }}
  />
        <div className="relative z-10 bg-wg max-w-2xl mx-auto text-center shadow-l-white">
          <h2 className="text-4xl mb-6 text-gray-800"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
          >
            
            Дорогой гость
          </h2>

          <p className="text-base text-gray-600 leading-relaxed mb-8">
            Мы рады сообщить Вам, что 29.08.2026 состоится самое
            главное торжество в нашей жизни - день нашей
            свадьбы! Приглашаем Вас разделить с нами радость
            этого незабываемого дня.
          </p>

          {/* Date with calendar icon */}
          <div className="flex-col items-start">
            <ul>
              <li className="flex justify-space-between md:px-16">
                <div className="flex items-start gap-12 mt-4">
                  <img
                  src={calendarIcon}
                  alt="Calendar"
                  className="w-8 h-8"
                  />
                  <span className="text-lg text-gray-800 items-start ">
                  29 августа 2026 года
                  </span>
                </div>
              </li>
              <li className="flex justify-space-between md:px-16">
                <div className="flex items-start gap-12 mt-4">
                  <img
                  src={clockIcon}
                  alt="Clock"
                  className="w-8 h-8 flex-shrink-0"
                  />
                  <span className="text-lg text-gray-800">
                    с 14:00 до 23:00
                  </span>
                </div>
              </li>

              <li className="flex justify-space-between md:px-16">
                <div className="flex items-start gap-12 mt-4">
                  <img
                    src={locationIcon}
                    alt="Location"
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <div className="text-left">
                    <div className="text-lg text-gray-800 mb-1">
                      г. Наро-Фоминск, площадь Свободы, 4В,
                    </div>
                    <div className="text-lg text-gray-800">
                      стеклянный лофт "Fabrik"
                    </div>
                  </div>
                </div>
              </li>
            </ul>  
          </div>
          

          {/* Dress code section */}
          <div className="mt-12">
            <h3 className="text-4xl mb-6 text-gray-800"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
            >
              Дресс-код
            </h3>

            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Мы будем рады видеть мужчин в классический
              костюмах тёмных тонов с галстуком или бабочкой, а
              женщин — в вечерних нарядах представленных оттенков:
            </p>

            {/* Color palette */}
            <div className="flex items-center justify-center gap-4">
              <div
                className="max-sm:w-12 max-sm:h-12 md:w-16 md:h-16 rounded-full"
                style={{ backgroundColor: "#000000" }}
              ></div>
              <div
                className="max-sm:w-12 max-sm:h-12 md:w-16 md:h-16 rounded-full"
                style={{ backgroundColor: "#011c17" }}
              ></div>
              <div
                className="max-sm:w-12 max-sm:h-12 md:w-16 md:h-16 rounded-full"
                style={{ backgroundColor: "#012c23" }}
              ></div>
              <div
                className="max-sm:w-12 max-sm:h-12 md:w-16 md:h-16 rounded-full"
                style={{ backgroundColor: "#330507" }}
              ></div>
              <div
                className="max-sm:w-12 max-sm:h-12 md:w-16 md:h-16 rounded-full"
                style={{ backgroundColor: "#540928" }}
              ></div>
              <div
                className="max-sm:w-12 max-sm:h-12 md:w-16 md:h-16 rounded-full"
                style={{ backgroundColor: "#a46a69" }}
              ></div>
            </div>
          </div>

          {/* Gift section */}
          <div className="mt-12">
            <p className="text-base text-gray-600 leading-relaxed">
              Ваше присутствие в день нашей свадьбы - самый
              значимый подарок для нас!
            </p>
            
          </div>

          {/* Program section */}
          <div className="mt-16">
            <h3 className="text-4xl mb-8 text-gray-800"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
            >
              Программа мероприятия
            </h3>

            <div className="max-w-md mx-auto">
              {/* Timeline item 1 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-semibold text-gray-800 mb-2"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
                  >
                    14:00
                  </div>
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  <div className="w-0.5 h-24 bg-gray-300"></div>
                </div>
                <div className="pt-1 pb-20">
                  <p className="text-lg text-gray-800 mb-2">
                    Сбор гостей
                  </p>
                  <p className="text-base text-gray-500">
                    Время пролетит незаметно за фуршетом и
                    общением с другими гостями
                  </p>
                </div>
              </div>

              {/* Timeline item 2 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-semibold text-gray-800 mb-2"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
                  >
                    15:00
                  </div>
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  <div className="w-0.5 h-24 bg-gray-300"></div>
                </div>
                <div className="pt-1 pb-20">
                  <p className="text-lg text-gray-800 mb-2">
                    Церемония
                  </p>
                  <p className="text-base text-gray-500">
                    Наша церемония пройдет на берегу реки.
                    Просим не опаздывать!
                  </p>
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-semibold text-gray-800 mb-2"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
                  >
                    16:00
                  </div>
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  <div className="w-0.5 h-24 bg-gray-300"></div>
                </div>
                <div className="pt-1 pb-20">
                  <p className="text-lg text-gray-800 mb-2">
                    Начало банкета
                  </p>
                  <p className="text-base text-gray-500">
                    Еда, выпивка и искренние поздравления
                  </p>
                </div>
              </div>

              {/* Timeline item 4 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-semibold text-gray-800 mb-2"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
                  >
                    22:00
                  </div>
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                </div>
                <div className="pt-1">
                  <p className="text-lg text-gray-800 mb-2">
                    Дискотека
                  </p>
                  <p className="text-base text-gray-500">
                    Окончание официальной части, торт,
                    бенгальские огни и жаркие танцы
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown section */}
      <div className="bg-[#011c17] py-12 px-8 min-h-screen items-center" style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  height: '200px' 
}}>
        <div className="max-w-4xl  text-center mx-auto ">
          <h3 className="text-2xl md:text-3xl text-white mb-6">
            До свадьбы осталось:
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white">
            <div>
              <span className="text-4xl md:text-5xl font-semibold">
                {timeLeft.days}
              </span>
              <span className="text-xl md:text-2xl ml-2">
                дней
              </span>
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-semibold">
                {timeLeft.hours}
              </span>
              <span className="text-xl md:text-2xl ml-2">
                часов
              </span>
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-semibold">
                {timeLeft.minutes}
              </span>
              <span className="text-xl md:text-2xl ml-2">
                минут
              </span>
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-semibold">
                {timeLeft.seconds}
              </span>
              <span className="text-xl md:text-2xl ml-2">
                секунд
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Подтверждение присутствия */}
      <div className="bg-white py-32 px-8 relative">

        <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage3})`,
          opacity: 0.5
        }}
        />


        <div className="relative z-10 max-w-6xl mx-auto bg-wg p-8 rounded-lg shadow-l-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Photo */}
            <div className="flex justify-center">
              <img
                src={couplePhoto}
                alt="Екатерина и Кирилл"
                className="w-full max-w-md"
              />
            </div>

            {/* Right: Form */}
            <div>
              <h3 className="text-4xl mb-8 text-gray-800" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}>
                Подтверждение присутствия
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label className="block text-lg text-gray-700 mb-2">
                    ФИО
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    className="text-base w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    placeholder="Введите ваше ФИО"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-lg text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="text-base w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    placeholder="Введите ваш телефон"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-lg text-gray-700 mb-2">
                    Адрес электронной почты
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="text-base w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    placeholder="Введите ваш email"
                  />
                </div>

                {/* Radio buttons */}
                <div>
                  <label className="block text-lg text-gray-700 mb-3">
                    Ваше участие
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="Я точно буду"
                        checked={
                          formData.attendance === "Я точно буду"
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attendance: e.target.value,
                          })
                        }
                        className="w-5 h-5"
                      />
                      <span className="text-base text-gray-700">
                        Я точно буду
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="Меня не будет"
                        checked={
                          formData.attendance ===
                          "Меня не будет"
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attendance: e.target.value,
                          })
                        }
                        className="w-5 h-5"
                      />
                      <span className="text-base text-gray-700">
                        Меня не будет
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="Пока затрудняюсь ответить"
                        checked={
                          formData.attendance === "Пока затрудняюсь ответить"
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attendance: e.target.value,
                          })
                        }
                        className="w-5 h-5"
                      />
                      <span className="text-base text-gray-700">
                        Пока затрудняюсь ответить
                      </span>
                    </label>
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <label className="text-lg block text-gray-700 mb-2">
                    Если у Вас есть аллергия, просим этого
                    указать
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        allergies: e.target.value,
                      })
                    }
                    className="text-base w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    placeholder="Укажите, если есть аллергии"
                  />
                </div>

                <p className="text-base text-gray-500 italic mt-4">
                  Просим дать точный ответ до 01.06.2026 года
                </p>

                {/* Кнопка отправки */}
                <button
  type="submit"
  disabled={isSubmitting}
  className="relative px-12 py-4 tracking-wider border border-gray-300 
             text-lg text-gray-700 bg-white 
             shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
             hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] 
             transition-shadow duration-300
             before:absolute before:bottom-0 before:left-1/2 
             before:w-0 before:h-[2px] before:bg-rose-300 
             before:transition-all before:duration-300 
             before:-translate-x-1/2
             hover:before:w-3/4
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isSubmitting ? "Отправка..." : "Отправить"}
</button>
              </form>
            </div>
          </div>
          {/* Примечание */}
          <div className="bg-wg py-16 md:px-8">
          
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl mb-4 text-gray-800">
              ПРИМЕЧАНИЕ
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              • Будем благодарны, если вы воздержитесь от криков
              "Горько" на празднике, ведь поцелуй — это знак
              выражения чувств, он не может быть по заказу.
            </p>

            <p className="text-base text-gray-600 leading-relaxed mt-4">
                • Мы понимаем, что дарить цветы на свадьбу - это
                традиция, но мы не сможем насладиться их красотой
                в полной мере...
                <br />
                Будем рады любой другой альтернативе (вино или в
                денежном эквиваленте).
            </p>
            <p className="text-base text-gray-600 leading-relaxed mt-4">
                • Очень просим, воздержаться от белого цвета в своих нарядах. Оставьте эти цвета жениху и невесте.
              
            </p>

            <p className="text-base text-gray-600 leading-relaxed">
              <br></br>
              • По любым возникающим вопросам: Организатор Ануш  <a href="tel:+79255188779" className="text-base text-blue-600 hover:text-blue-800 hover:underline"><u>+7 (925) 518-87-79</u></a>
            </p>
          </div>
        </div>
        </div>

        
        
      </div>

      

      {/* Hotels section for out-of-town guests */}
      <div className="min-h-screen bg-wgg py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div>
          <div className="py-16 px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl mb-6 text-gray-800 text-center">
                Как нас найти
              </h3>
              <p className="text-xl text-gray-600 text-center mb-8">
                г. Наро-Фоминск, площадь Свободы, 4В, стеклянный лофт "Fabrik"
              </p>
              <Map className="max-w-4xl"
                center={coordinates} 
                zoom={17} 
                address="Лофт Fabrik, Наро-Фоминск"
              />
            </div>
          </div>
        </div>
            <p className="text-3xl mb-6 text-gray-800 text-center">
              Мы подобрали для вас варианты размещения
            </p>
            <div id="hotels-widget" className="min-h-[400px]"></div>
            {/* <div className="text-center">
              <a 
                href="https://travel.yandex.ru/s/EVz01h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#011c17] text-white hover:bg-[#012c23] transition-colors"
              >
                Посмотреть варианты отелей и апартаментов
              </a>
            </div> */}
          </div>

          

        </div>
      </div>
      <div className="neon min-h py-16 px-8" style={{ 
  display: 'flex', 
  alignItems: 'center', 

}}>
        <pre>
           MEOW MEOW MEOW,
           <br />
           I'M A KITTY CAT.
        </pre>
        <img
                  src={cat}
                  alt="cat"
                  className="w-16 h-16 filtered-gif "
                  />
      </div>
    </div>
    
  );
}