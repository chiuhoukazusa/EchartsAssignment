//audio
//const button1 = document.getElementById('button1');

const container = document.getElementById('container');
const file = document.getElementById('fileupload');
let audioSource;
let analyzer;
let _fftSize = 512;

var dataArray = new Uint8Array

//map
var dom = document.getElementById('main');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};
var option;

$.getJSON(
    'asset/data/HangZhou.json',
    function (buildingsGeoJSON) {
      echarts.registerMap('buildings', buildingsGeoJSON);
      var regions = buildingsGeoJSON.features.map(function (feature) {
        if(feature.properties.name === '西湖区') {
        return {
          name: feature.properties.name,
          value: Math.max(Math.sqrt(feature.properties.height), 0.1),
          height: 20
        };
        }else if(feature.properties.name === '余杭区') {
          return {
            name: feature.properties.name,
            value: Math.max(Math.sqrt(feature.properties.height), 0.1),
            height: 10
          };
        }else if(feature.properties.name === '滨江区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 30
            };
        }else if(feature.properties.name === '萧山区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 40
            };
        }else if(feature.properties.name === '拱墅区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 50
            };
        }else if(feature.properties.name === '上城区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 60
            };
        }else if(feature.properties.name === '钱塘区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 70
            };
        }else if(feature.properties.name === '富阳区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 80
            };
        }else if(feature.properties.name === '临安区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 90
            };
        }else if(feature.properties.name === '临平区') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 10
            };
        }else if(feature.properties.name === '桐庐县') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 20
            };
        }else if(feature.properties.name === '建德市') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 30
            };
        }else if(feature.properties.name === '淳安县') {
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 40
            };
        }else{
            return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: 0
            };
        }
      });

    var option = {
        series: [
            {
            type: 'map3D',
            map: 'buildings',
            shading: 'realistic',
            realisticMaterial: {
                roughness: 0.6,
                textureTiling: 20,
                detailTexture: 'asset/texture/woods.jpg'
            },
            postEffect: {
                enable: true,
                bloom: {
                enable: false
                },
                SSAO: {
                enable: true,
                quality: 'medium',
                radius: 10,
                intensity: 1.2
                },
                depthOfField: {
                enable: false,
                focalRange: 5,
                fstop: 1,
                blurRadius: 6
                }
            },
            groundPlane: {
                show: false,
                color: '#333'
            },
            light: {
                main: {
                intensity: 6,
                shadow: true,
                shadowQuality: 'high',
                alpha: 30
                },
                ambient: {
                intensity: 0
                },
                ambientCubemap: {
                texture: 'asset/texture/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 1,
                specularIntensity: 1
                }
            },
            viewControl: {
                minBeta: -360,
                maxBeta: 360
            },
            itemStyle: {
                areaColor: '#666'
            },
            label: {
                color: 'white'
            },
            silent: false,
            instancing: true,
            boxWidth: 200,
            boxHeight: 1,
            data: regions
            }
        ]
        }

    if (option && typeof option === 'object') {
        myChart.setOption(option);
        }
    
    window.addEventListener('resize', myChart.resize);
}
);

function refreshData(){
    console.log("refreshData");
    $.getJSON(
        'asset/data/HangZhou.json',
        function (buildingsGeoJSON) {
          echarts.registerMap('buildings', buildingsGeoJSON);
          var regions = buildingsGeoJSON.features.map(function (feature) {
            if(feature.properties.name === '西湖区') {
            return {
              name: feature.properties.name,
              value: Math.max(Math.sqrt(feature.properties.height), 0.1),
              height: (dataArray[0]/255) * 80
            };
            }else if(feature.properties.name === '余杭区') {
              return {
                name: feature.properties.name,
                value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                height: (dataArray[1]/255) * 80
              };
            }else if(feature.properties.name === '滨江区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[2]/255) * 80
                };
            }else if(feature.properties.name === '萧山区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[3]/255) * 80
                };
            }else if(feature.properties.name === '拱墅区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[4]/255) * 80
                };
            }else if(feature.properties.name === '上城区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[5]/255) * 80
                };
            }else if(feature.properties.name === '钱塘区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[6]/255) * 80
                };
            }else if(feature.properties.name === '富阳区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[7]/255) * 80
                };
            }else if(feature.properties.name === '临安区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[8]/255) * 80
                };
            }else if(feature.properties.name === '临平区') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[9]/255) * 80
                };
            }else if(feature.properties.name === '桐庐县') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[10]/255) * 80
                };
            }else if(feature.properties.name === '建德市') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[11]/255) * 80
                };
            }else if(feature.properties.name === '淳安县') {
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: (dataArray[12]/255) * 80
                };
            }else{
                return {
                    name: feature.properties.name,
                    value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    height: 0
                };
            }
          });
    
        var option = {
            series: [
                {
                type: 'map3D',
                map: 'buildings',
                shading: 'realistic',
                realisticMaterial: {
                    roughness: 0.6,
                    textureTiling: 20,
                    detailTexture: 'asset/texture/woods.jpg'
                },
                postEffect: {
                    enable: true,
                    bloom: {
                    enable: false
                    },
                    SSAO: {
                    enable: true,
                    quality: 'medium',
                    radius: 10,
                    intensity: 1.2
                    },
                    depthOfField: {
                    enable: false,
                    focalRange: 5,
                    fstop: 1,
                    blurRadius: 6
                    }
                },
                groundPlane: {
                    show: false,
                    color: '#333'
                },
                light: {
                    main: {
                    intensity: 6,
                    shadow: true,
                    shadowQuality: 'high',
                    alpha: 30
                    },
                    ambient: {
                    intensity: 0
                    },
                    ambientCubemap: {
                    texture: 'asset/texture/canyon.hdr',
                    exposure: 2,
                    diffuseIntensity: 1,
                    specularIntensity: 1
                    }
                },
                viewControl: {
                    minBeta: -360,
                    maxBeta: 360
                },
                itemStyle: {
                    areaColor: '#666'
                },
                label: {
                    color: 'white'
                },
                silent: false,
                instancing: true,
                boxWidth: 200,
                boxHeight: 1,
                data: regions
                }
            ]
            }
    
        if (option && typeof option === 'object') {
            myChart.setOption(option);
            }
        
        window.addEventListener('resize', myChart.resize);
    }
    );
}

file.addEventListener('change', function(){
    const files = this.files;
    //console.log(this.files);
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();

    const audioCtx = new AudioContext();//window.AudioContext || window.webkitAudioContext);
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyzer = audioCtx.createAnalyser();//音频分析器
    audioSource.connect(analyzer);
    analyzer.connect(audioCtx.destination);
    analyzer.fftSize = _fftSize;
    const bufferLength = analyzer.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    const barWidth = 15;//(canvas.width/2)/bufferLength;
    let barHeight;
    let x;

    function animate(){
        let percent = audio1.currentTime/audio1.duration;
        x = 0;
        //将当前频率数据复制到传入的 Uint8Array（无符号字节数组）中,
        //如果数组的长度小于 AnalyserNode.frequencyBinCount, 
        //那么 Analyser 多出的元素会被删除。如果是大于，那么数组多余的元素会被忽略。
        analyzer.getByteFrequencyData(dataArray);
        if(dataArray[0] > 0){
            refreshData();
        }
        requestAnimationFrame(animate);
    }
    animate();

});



