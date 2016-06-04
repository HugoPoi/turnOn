import {CronJob as Cron} from 'cron';
import TemperatureService from '../components/temperatureService';

module.exports = function(app) {
  var Measure = app.models.Measure;
  var job = new Cron('*/5 * * * * *', function(){
    TemperatureService.getTemperature('LM35', function(err, temp){
      Measure.create({
        value: temp,
        type: 'temperature',
        from: 'LM35',
        when: new Date()
      });
      TemperatureService.getTemperature('DS18B20', function(err, temp){
        Measure.create({
          value: temp,
          type: 'temperature',
          from: 'DS18B20',
          when: new Date()
        });
      });
    });
  });

  if(!/gulp/.test(process.argv.join())){
    console.log('Start measure job !');
    job.start();
  }
};
