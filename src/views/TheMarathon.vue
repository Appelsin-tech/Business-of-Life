<template>
  <div>
    <section class="s-marathon p-default-flex">
      <div class="container page">
        <div class="wrapper-content">
          <div class="col-img">
            <img src="@/assets/img/marathon-man.jpg" alt="Человек">
          </div>
          <div class="col-content">
            <h1 class="visually-hidden">Марафон "Корона на миллион"</h1>
            <strong class="g-caption-inner">Марафон</strong>
            <strong class="desc-strong g-caption">«Корона на Миллион»</strong>
            <p class="desc-connect" >Прими участие БЕСПЛАТНО!</p>
            <p class="desc-connect" >Развивайся онлайн - прокачай свой личный бренд и получи возможности новых технологий и бизнеса в Интернет</p>
            <button-app href="https://t-do.ru/coronanamillion_bot" target="_blank">
              Стать участником
            </button-app>
          </div>
        </div>
      </div>
    </section>
    <section class="s-description">
      <div class="container">
        <h2 class="g-caption-inner g-caption-inner--mb-80">О марафоне</h2>
        <div class="col-wrapper">
          <div class="col-iframe">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/jZFimUTU6tI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="col-text">
            <div class="content">
              <div class="item">
                <p class="title-info"><strong>Организаторы:</strong></p>
                <p class="info">Международная академия интернет предпринимателей <a href="https://businessof.life/" target="_blank">Business of Life</a></p>
                <p class="info">в партнерстве с платформой для инвесторов и стартапов <a href="https://crowdsale.network/" target="_blank">Crowdsale Network</a></p>
              </div>
              <div class="item">
                <p class="title-info"><strong>Формат:</strong> <span>Онлайн занятия и практические задания. Лучшие получат бонусные уроки и разборы с тренерами</span></p>
              </div>
              <div class="item">
                <p class="title-info"><strong>Стоимость участия:</strong> <span>Бесплатно</span></p>
              </div>
              <div class="item">
                <p class="title-info"><span>* дополнительно может потребоваться покупка недорогих сервисов для создания контента в инстаграм, инструментов рассылки и тд.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="s-prize">
      <div class="container">
        <h2 class="g-caption-inner g-caption-inner--mb-80">Призовой фонд</h2>
        <div class="col-wrapper">
          <div class="col-img">
            <img src="@/assets/img/marathon-corona.png" alt="">
          </div>
          <div class="col-sum">
            <p class="sum-bold">2 000 000 CSNP</p>
            <p class="desc-sum g-caption-section">Эквивалент 2 миллионов токенов ~ 200'000$</p>
          </div>
          <div class="col-content">
            <div class="desc-wrapper">
              <div class="item">
                <p class="item-title">Победитель получит</p>
                <p class="sum-blue"><strong class="g-caption-inner">1 000 000</strong>  <span>CSNP</span></p>
              </div>
              <div class="item">
                <p class="item-title">Дополнительно</p>
                <p class="sum-blue"><strong class="g-caption-inner">1 000 000</strong>  <span>CSNP</span></p>
                <p class="item-desc">(будет поровну распределен между финалистами марафона)</p>
              </div>
            </div>
            <p class="desc-bottom">
              CSNP - цифровой актив платформы Crowdsale Network, которая торгуется на Европейских криптовалютных биржах:
              <a href="https://coinsbit.io/" target="_blank">www.coinsbit.io</a> и <a href="https://p2pb2b.io/" target="_blank">www.p2pb2b.io</a><br>
              Всего на рынок выпущено 50 000 000 токенов.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="s-target">
      <div class="container">
        <h2 class="g-caption-inner g-caption-inner--mb-80">что будет на марафоне</h2>
        <p class="g-caption-section">Наша основная цель — дать максимум пользы всем, кто на время карантина находится дома</p>
        <p class="description">Когда большинство сейчас в страхе и условиях неопределенности, участники нашего марафона будут прокачиваться, получая максимум пользы:</p>
        <ul class="list-benefit">
          <li v-for="item in listBenefit" :key="item.text">
            <component :is="item.icon" class="g-icon"/>
            <p class="text">{{item.text}}</p>
          </li>
        </ul>
      </div>
    </section>
    <section class="s-coach">
      <div class="container">
        <h2 class="g-caption-inner g-caption-inner--mb-80">Наши тренеры</h2>
        <div class="wrapper-coach">
          <div class="coach" v-for="coach in listCoach" :key="coach.name">
            <div class="img-wrapper">
              <img class="img" :src="require(`@/assets/img/marathon-coach/${coach.img}`)" alt="">
              <a :href="coach.instagram" class="social" target="_blank">
                <icon-instagram class="g-icon"/>
              </a>
            </div>
            <p class="name">{{coach.name}}</p>
            <p class="desc" v-html="coach.desc"></p>
          </div>
        </div>
      </div>
    </section>
    <section class="s-registration">
      <div class="container">
        <h2 class="g-caption-inner">Присоединяйтесь к нам</h2>
        <span class="desc">Марафон уже стартовал!</span>
        <button-app href="https://t-do.ru/coronanamillion_bot" target="_blank">
          Стать участником
        </button-app>
      </div>
    </section>
  </div>

</template>

<script>
export default {
  name: 'TheMarathon',
  data() {
    return {
      listBenefit: [
        {
          icon: 'icon-school',
          text: 'Новые знания о возможностях бизнеса в Интернет'
        },
        {
          icon: 'icon-finance',
          text: 'Освоение онлайн инструментов продвижения товаров и услуг в Интернет'
        },
        {
          icon: 'icon-currency-usd',
          text: 'Готовый бизнес в Интернете не выходя из дома, который будет приносить как активный, так и пассивный доход, даже когда вы отойдете от дел'
        },
        {
          icon: 'icon-account-switch',
          text: 'Создание и развитие личного бренда через социальные сети Instagram, создавая качественный контент'
        },
        {
          icon: 'icon-run-fast',
          text: 'Полезное и увлекательное времяпровождение. Совместные онлайн тренировки'
        },
        {
          icon: 'icon-lan-connect',
          text: 'Международный онлайн нетворкинг'
        }
      ],
      listCoach: [
        {
          img: 'coach-1.jpg',
          name: 'Elen Yu',
          desc: 'Инста•тьютор, дизайнер, маркетер <br> Автор курса “Сторис не как у всех”',
          instagram: 'https://instagram.com/elen__yu?igshid=vs8omdo1phil'
        },
        {
          img: 'coach-2.jpg',
          name: 'Андрей Красик',
          desc: 'Профессиональный видеограф <br> г.Киев',
          instagram: 'https://instagram.com/andreykrasik'
        },
        {
          img: 'coach-14.jpg',
          name: 'Ернар Ескендир ',
          desc: 'Архитектор, дизайнер, фотограф',
          instagram: 'https://instagram.com/yernaryeskendir?igshid=n8mjig2x4kjc'
        },
        {
          img: 'coach-15.jpg',
          name: 'Сулушаш  Ардаккызы ',
          desc: 'StoryMaker, SMM-менеджер',
          instagram: 'https://instagram.com/sulushash_ardakkyzy?igshid=1peltln40roqg'
        },
        {
          img: 'coach-3.jpg',
          name: 'Кугай Евгений',
          desc: 'Директор по развитию фитнес клуба Fitness Palace Astana. Мастер тренер групповых и функциональных программ. Сертифицированный инструктор по кунг фу Академии ММА. Сертифицированный инструктор программ Les Mills, TRX. Презентер международных конвенций.',
          instagram: 'https://instagram.com/ast_freeman?igshid=1o06fyjd1xfwp'
        },
        {
          img: 'coach-4.jpg',
          name: 'Светлана Казакова',
          desc: 'Сертифицированный инструктор тренажерного зала и групповых программ <br> Нутрициолог',
          instagram: 'https://instagram.com/kazakova_fitness_aktau'
        },
        {
          img: 'coach-5.jpg',
          name: 'Жалгасов Ерлан',
          desc: 'Психолог, гипнолог, гипнотизёр, менталист, тренер, специалист в области управления человеческими ресурсами, магистр делового администрирования (MBA). Член Казахской ассоциации психологов и психотерапевтов (КАПП).',
          instagram: 'https://www.instagram.com/tv/B-i1K-jjgjZ/?igshid=xldoyyk5nqwd'
        },
        {
          img: 'coach-6.jpg',
          name: 'Ермек Жукин',
          desc: 'Бизнес тренер, консультант, владелец компании «EnergiCo», эксперт в области эффективных технологий продаж. Проводит семинары по продажам с 2003 года.',
          instagram: 'https://instagram.com/schoolsaleskz?igshid=e9s5s4s4y15z'
        },
        {
          img: 'coach-7.jpg',
          name: 'Айганым Егзекова',
          desc: 'Основательница холдинга Medial Group, который занимается оснащением клиник под ключ, оборудованием машин скорой помощи и вертолетов санитарной авиации.',
          instagram: 'https://instagram.com/aiganym_yegzek?igshid=yte8g30vixbi'
        },
        {
          img: 'coach-13.jpg',
          name: 'Михаил Дудник',
          desc: 'Президент Ассоциации спикеров Казахстана <br> Эксперт в системном развитии харизмы для бизнеса',
          instagram: 'https://instagram.com/real_dudnik?igshid=uzoc7c3n3drk'
        },
        {
          img: 'coach-8.jpg',
          name: 'Азимов Аят',
          desc: 'Основатель франшизы Global Coffee <br> Кофейный магнат.',
          instagram: 'https://instagram.com/ayatazimov?igshid=qre03i9tak7a'
        },
        {
          img: 'coach-9.jpg',
          name: 'Шунгулов Адильбек',
          desc: 'Майнер-инженер. <br> 4 года в майнинге криптовалют. <br> Дата центр под ключ.',
          instagram: 'https://instagram.com/adilbekshungulov'
        },
        {
          img: 'coach-10.jpg',
          name: 'Еркебулан Токабаев',
          desc: 'Практикующий трейдер с 2012 года. <br> Основатель школы трейдинга Trading Skill',
          instagram: 'https://instagram.com/tradingskill01'
        },
        {
          img: 'coach-11.jpg',
          name: 'Арман Абжанов',
          desc: 'Опыт в трейдинге и инвестировании больше 5 лет. С 2015 года торговал на фондовом рынке. С 2018 по настоящее время торгует на криптовалютном рынке. Является трейдером в команде Bearox.kz',
          instagram: 'https://instagram.com/bearox.kz?igshid=1tr97wlwcvuj1'
        },
        {
          img: 'coach-12.jpg',
          name: 'Ерлан Думанулы',
          desc: 'Основатель платформы для стартапов и инвесторов Crowdsale Network',
          instagram: 'https://instagram.com/yerlan_dumanuly?igshid=1vpcabcof89se'
        },
        {
          img: 'coach-17.jpg',
          name: 'Талгат Игликов',
          desc: 'Профессиональный Финансовый Директор, Автор книги "Думай, как Финансовый директор", основатель Iglikov Financial School',
          instagram: 'https://www.instagram.com/talgat_iglikov/'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .g-caption-inner--mb-80 {
    margin-bottom: 80px;
    .lg-block({
      margin-bottom: 40px;
    });
    .sm-block({
      margin-bottom: 30px;
    });
    .xs-block({
      margin-bottom: 25px;
    });
  }
  .btn-app {
    background: #FFCC00;
    border-color: #FFCC00;
    .text {
      color: #000;
    }
  }
  .s-marathon {
    background: #18191A;
    min-height: auto;
    padding-bottom: 150px;
    .md-block({
      padding-bottom: 50px;});
    .wrapper-content {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding-top: 80px;
      box-sizing: border-box;
      z-index: 2;
      transform: translateY(-6%);
      @media screen and (max-height: 520px) {
        transform: translateY(0);
      }
      .md-block({
        flex-direction: column; align-items: center;
        padding-top: 50px;});
      .sm-block({
        padding-top: 20px;});
      .col-img {
        max-width: 30%;
        .sm-block({max-width: 38%;});
        .ss-block({max-width: 180px;});
      }
      .col-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        z-index: 5;
        color: #fff;
        max-width: 60%;
        .lg-block({max-width: 60%;});
        .md-block({max-width: 90%;
          margin-top: 50px; align-items: center;
          text-align: center;});
        .g-caption {
          margin-bottom: 40px;
          color: #fff;
          text-transform: initial;
          .lg-block({ margin-bottom: 30px;});
          &-inner {
            color: #fff;
            margin-bottom: 20px;
            .sm-block({
              margin-bottom: 10px;})
          }
        }
        .desc-connect {
          margin-bottom: 20px;
          font-size: 1.8rem;
          .sm-block({  font-size: 1.6rem;
            margin-bottom: 10px;})
        }
        .btn-app {
          margin-top: 20px;
        }
      }
    }
  }
  .s-description {
    padding: 100px 0 60px;
    .lg-block({
      padding: 80px 0 40px;});
    .xs-block({
      padding: 50px 0 25px;});
    .col-wrapper {
      display: flex;
      justify-content: space-between;
      .md-block({ flex-direction: column; });
      .col-iframe {
        width: 45%;
        flex-shrink: 0;
        .md-block({
          width: 60%;
          height: 250px;
          margin-right: 0;
          margin-bottom: 30px;});
        .sm-block({
          width: 100%;});
        .xs-block({
          height: 210px;});
      }
      .col-text {
        width: 45%;
        .md-block({
          width: 100%;});
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.5;
          .item {
            margin-bottom: 30px;
            .sm-block({
              margin-bottom: 20px;});
            &:first-child {
              .info:last-of-type {
                margin-bottom: 0;
              }
            }
            &:nth-child(2) {
              .title-info {
                display: flex;
                margin-bottom: 0;
                strong {
                  margin-right: 1em;
                }
              }
            }
            &:nth-child(3) {
                margin-bottom: 0;
              .title-info {
                display: flex;
                strong {
                  margin-right: 1em;
                }
              }
            }
            &:nth-child(4) {
              margin-bottom: 0;
              .title-info {
                margin-bottom: 0;
              }
            }
            .title-info {
              margin-bottom: 20px;
              .sm-block({
                margin-bottom: 15px;});
              strong {
                font-weight: 600;
              }
            }
            .info {
              margin-bottom: 15px;
              .sm-block({
                margin-bottom: 10px;});
              a {
                color: @colorMainSecondary;
                border-bottom: 1px solid @colorMainSecondary;
                transition: 0.3s;
                &:hover {
                  border-bottom-color: transparent;
                }
              }
            }
          }
        }
      }
    }
  }
  .s-prize {
    padding: 60px 0;
    .lg-block({
      padding: 40px 0;});
    .xs-block({
      padding: 25px 0;});
    .col-wrapper {
      display: grid;
      grid-template-columns: minmax(50px, 30%) 1fr;
      grid-column-gap: 100px;
      .md-block({grid-gap: 50px;});
      .ss-block({grid-gap: 30px;});
      .ss-block({grid-gap: 30px;});
      .col-img {
        grid-row: ~"1 / 3";
        .md-block({
          grid-row: ~"1 / 2";});
      }
      .col-sum {
        display: flex;
        flex-direction: column;
        .md-block({ justify-content: center;});
        .sum-bold {
          display: block;
          font-size: 7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #FFCC00;
          margin-bottom: 20px;
          .lg-block({
            font-size: 5rem;
          });
          .sm-block({
            font-size: 4rem;
            margin-bottom: 10px;
          });
          .ss-block({
            font-size: 2.6rem;
          });
        }
        .desc-sum {
          margin-bottom: 50px;
          .lg-block({
            margin-bottom: 35px;});
          .md-block({
            margin-bottom: 0;});
          .sm-block({
            font-size: 2.2rem;});
          .ss-block({
            font-size: 2rem;});
        }
      }
      .col-content {
        grid-column: ~"2 / 3";
        .md-block({grid-column: ~"1 / 3";});
        .desc-wrapper {
          display: flex;
          margin-bottom: 50px;
          .lg-block({
            margin-bottom: 35px;});
          .sm-block({
            flex-direction: column;});
          .item {
            &:first-child {
              margin-right: 100px;
              flex-shrink: 0;
              .lg-block({
                margin-right: 70px;});
              .sm-block({
                margin-right: 0;
                margin-bottom: 20px;});
            }
            .item-title {
              font-size: 2rem;
              font-weight: 800;
              color: #000;
              .lg-block({
                font-size: 1.8rem;
              });
              .xs-block({
                font-size: 1.6rem;
              });
            }
            .sum-blue {
              color: @colorMainSecondary;
              font-weight: 400;
              font-size: 2rem;
              .lg-block({
                font-size: 1.8rem;
              });
              .xs-block({
                font-size: 1.6rem;
              });
              strong {
                display: inline-block;
                margin-right: 15px;
                margin-bottom: 0;
              }
            }
            .item-desc {

            }
          }
        }
        .desc-bottom {
          line-height: 1.5;
          a {
            color: @colorMainSecondary;
            transition: 0.3s;
            border-bottom: 1px solid @colorMainSecondary;
            &:hover {
              border-bottom-color: transparent;
            }
          }
        }
      }
    }
  }
  .s-target {
    padding: 60px 0;
    .lg-block({
      padding: 40px 0;});
    .xs-block({
      padding: 25px 0;});
    .description {
      margin-bottom: 70px;
      display: block;
      font-size: 2rem;
      color: #000;
      line-height: 1.5;
      .lg-block({
        margin-bottom: 50px;});
      .sm-block({
        margin-bottom: 30px;
        font-size: 1.8rem;});
      .xs-block({
        margin-bottom: 20px;
        line-height: 1.5;
        font-size: 1.6rem;});
    }
    .list-benefit {
      .row-flex();
      justify-content: space-between;
      > li {
        .col();
        .size(3.5);
        .size-lg(5);
        .size-ss(11);
        .size-xs(12);
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        .sm-block({
          margin-bottom: 20px;});
        .g-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 20px;
          color: #FFCC00;
          .xs-block({
            margin-bottom: 15px;
            width: 30px;
            height: 30px;});
        }
        .text {
          line-height: 1.5;
        }
      }
    }
  }
  .s-coach {
    padding: 60px 0;
    .lg-block({
      padding: 40px 0;});
    .xs-block({
      padding: 25px 0;});
    .wrapper-coach {
      .row-flex();
      .xl-block({
        justify-content: space-around;});
      .coach {
        .col();
        .size(3);
        .size-xl(5);
        .size-md(6);
        .size-ss(12);
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
        line-height: 1.5;
        .img-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 50px;
          .md-block({
            margin-bottom: 40px;});
          .img {
            display: inline-block;
            width: 180px;
            height: 180px;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
            background-color: #ccc;
          }
          .social {
            position: absolute;
            bottom: 0;
            transform: translateY(50%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 13px;
            border-radius: 50%;
            border: 1px solid #FFCC00;
            background: #FFCC00;
            transition: 0.3s;
            .g-icon {
              width: 25px;
              height: 25px;
              color: #000;
              transition: 0.3s;
              .sm-block({
                width: 20px;
                height: 20px;});
            }
          }
        }
        .name {
          font-weight: bold;
          margin-bottom: 20px;
          .md-block({
            margin-bottom: 15px;});
        }
        .desc {
          margin-bottom: auto;
          line-height: 1.5;
          text-align: center;
        }
      }
    }
  }
  .s-registration {
    padding: 100px 0;
    margin: 60px 0 250px;
    background: #18191A;
    .lg-block({
      padding: 80px 0;
      margin: 40px 0 250px;});
    .xs-block({
      padding: 50px 0;
      margin: 25px 0 250px;});
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .g-caption-inner {
        color: #fff;
      }
      .desc {
        color: #fff;
        margin-bottom: 50px;
        .lg-block({
          margin-bottom: 30px;});
        .sm-block({
          margin-bottom: 20px;});
      }
    }
  }
</style>
