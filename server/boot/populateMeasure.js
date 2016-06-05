import {CronJob as Cron} from 'cron';
import TemperatureService from '../components/temperatureService';

module.exports = function(app) {
  var Measure = app.models.Measure;
  var job = new Cron('*/5 * * * * *', function(){
    TemperatureService.getTemperature('LM35', function(err, temp){
      if(!err){
        Measure.create({
          value: temp,
          type: 'temperature',
          from: 'LM35',
          when: new Date()
        });
      }
      TemperatureService.getTemperature('DS18B20', function(err, temp){
        if(!err){
          Measure.create({
            value: temp,
            type: 'temperature',
            from: 'DS18B20',
            when: new Date()
          });
        }
      });
    });
  });

  function watchPotenciometer(){
    TemperatureService.init(function(err, serialPort){
      serialPort.on('data', function(data){
        var extractValue = /^potA5=([0-9]+)$/.exec(data);
        if(extractValue){
          //Update database
          Measure.findOrCreate({ where: { type: 'pot', from: 'potA5'} }, {
            value: parseInt(extractValue[1]),
            type: 'pot',
            from: 'potA5',
            when: new Date()
          }, function(err, instance, created){
            if(instance && !created){
              instance.value = parseInt(extractValue[1]);
              instance.when = new Date();
              instance.save();
            }
          });
        }
      });
    });
  }

  if(!/gulp/.test(process.argv.join())){
    console.log('Start measure job !');
    watchPotenciometer();
    //job.start();
  }
};
