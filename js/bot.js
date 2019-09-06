/* Portugues para o Select2 */
!function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;e.define("select2/i18n/pt-BR",[],function(){return{errorLoading:function(){return"Os resultados não puderam ser carregados."},inputTooLong:function(e){var n=e.input.length-e.maximum,r="Apague "+n+" caracter";return 1!=n&&(r+="es"),r},inputTooShort:function(e){return"Digite "+(e.minimum-e.input.length)+" ou mais caracteres"},loadingMore:function(){return"Carregando mais resultados…"},maximumSelected:function(e){var n="Você só pode selecionar "+e.maximum+" ite";return 1==e.maximum?n+="m":n+="ns",n},noResults:function(){return"Nenhum resultado encontrado"},searching:function(){return"Buscando…"},removeAllItems:function(){return"Remover todos os itens"}}}),e.define,e.require}();
function msg(e, s){
    e.pause();
    e.currentTime = 0;
    e.src = "assets/" + s;
    e.load();
    e.play();
}
//Doc ready
$(document).ready(function() {
    let inputEstado     = $('.estado select');
    let inputRegiao     = $('.regiao select');
    let inputCidade     = $('.cidade select');
    let inputBairro     = $('.bairro select');
    let inputSegmento   = $('.segmento select');
    //Interface de audio
    audio = new Audio();
    audio.src = "assets/TOBI - Oi.mp3";

    //Botão de start
    $('#start').on('click', function () {
        $('#start').fadeOut(0, function(){
            //Audio 1 (já está no cache)
            audio.play();

            $('#home').hide();
            $('.input-boxes').fadeIn(200);
            $('.estado').fadeIn(0, function(){
                $.ajax({
                    type: "GET",
                    url: "assets/ajax.php",
                    data: {},
                    dataType: "json",
                    success: function (response) {
                        response.forEach(item => {
                            let opt = new Option(item[0], item[1])
                            $(inputEstado).append(opt)
                            inputEstado.select2({
                                language: "pt-BR",
                                allowClear: true,
                            });
                        })
                    },
                });
            })
        });
    });

    //Input do Estado (1 input)
    $(inputEstado).on('change', function () {
        if(inputEstado.val() != ""){
            let estado = inputEstado.val();
            $('.estado').hide(0, function(){
                $.ajax({
                    type: "get",
                    url: "assets/ajax.php",
                    data: {"estado": estado},
                    beforeSend: function(){
                        $('.preloader').fadeIn(300)
                    },
                    dataType: "json",
                    success: function (r) {
                        if(r.length == 0){
                            //Audio falha1
                            msg(audio, "TOBI - Falha1.mp3");

                            $('.preloader').fadeOut(500, function(){
                                $(audio).one("ended", function(){
                                    setTimeout(() => {
                                        $('.estado').fadeIn(0, function(){
                                            $('#btn-con').attr("href", "http://okituke.com.br/okituke/form-cadastro.php?segmento=avbnsdobrasil&estado="+estado).fadeIn(0);
                                        })
                                    }, 500);
                                });
                            })
                        }else{
                            //audio sucesso1
                            msg(audio, "TOBI - Sucesso1.mp3");
                            $('#btn-con').fadeOut(0);
                            $('.preloader').fadeOut(600, function(){
                                r.forEach(item => {
                                    let opt = new Option(item[1], item[2])
                                    $(inputRegiao).append(opt)
                                })
                                $('.regiao').fadeIn(0, function(){
                                    inputRegiao.select2({
                                        language: "pt-BR",
                                        allowClear: true,
                                    });
                                });
                            })
                        }
                    },
                    error: function(){
                        alert("Houve um erro.");
                    }
                });
            })
        }
    });
    $(inputRegiao).on('change', function () {
        if(inputRegiao.val() != ""){
            let regiao = inputRegiao.val();
            $('.regiao').hide(0, function(){
                $.ajax({
                    type: "get",
                    url: "assets/ajax.php",
                    data: {"regiao": regiao},
                    beforeSend: function(){
                        $('.preloader').fadeIn(300)
                    },
                    dataType: "json",
                    success: function (r) {
                        if(r.length == 0){
                            //Audio falha2
                            msg(audio, "TOBI - Falha2.mp3");
                            $('.preloader').fadeOut(500, function(){
                                $(audio).one("ended", function(){
                                    setTimeout(() => {
                                        $('.regiao').fadeIn(0, function(){
                                            $('#btn-con').attr("href", "http://okituke.com.br/okituke/form-cadastro.php?segmento=avbnsdobrasil&regiao="+regiao).fadeIn(0);
                                        })
                                    }, 500);
                                });
                            })
                        }else{
                            //audio sucesso2
                            msg(audio, "TOBI - Sucesso2.mp3");
                            $('#btn-con').fadeOut(0);
                            $('.preloader').fadeOut(600, function(){
                                r.forEach(item => {
                                    let opt = new Option(item[2], item[3])
                                    $(inputCidade).append(opt)
                                })
                                $('.cidade').fadeIn(0, function(){
                                    inputCidade.select2({
                                        language: "pt-BR",
                                        allowClear: true,
                                    });
                                });
                            })
                        }
                    },
                    error: function(){
                        alert("Houve um erro.");
                    }
                });
            })
        }
    });
    //Input da cidade (3 input)
    $(inputCidade).on('change', function () {
        if(inputCidade.val() != ""){
            let cidade = inputCidade.val();
            $('.cidade').hide(0, function(){
                $.ajax({
                    type: "get",
                    url: "assets/ajax.php",
                    data: {"cidade": cidade},
                    beforeSend: function(){
                        $('.preloader').fadeIn(300)
                    },
                    dataType: "json",
                    success: function (r) {
                        if(r.length == 0){
                            //Audio falha 3
                            msg(audio, "TOBI - Falha3.mp3");
                            $('.preloader').fadeOut(600, function(){
                                $(audio).one("ended", function(){
                                    setTimeout(() => {
                                        $('.cidade').fadeIn(0, function(){
                                            $('#btn-con').attr("href", "http://okituke.com.br/okituke/form-cadastro.php?segmento=avbnsdobrasil&cidade="+cidade).fadeIn(0);
                                        })
                                    }, 500);
                                });
                            })
                        }else{
                            //Audio sucesso 3
                            msg(audio, "TOBI - Sucesso3.mp3");
                            $('#btn-con').fadeOut(0);
                            $('.preloader').fadeOut(300, function(){
                                r.forEach(item => {
                                    let opt = new Option(item[3], item[4])
                                    $(inputBairro).append(opt)
                                })
                                $('.bairro').fadeIn(0, function(){
                                    inputBairro.select2({
                                        language: "pt-BR",
                                        allowClear: true,
                                    });
                                });
                            })
                        }
                    },
                    error: function(){
                        alert("Houve um erro.");
                    }
                });
            })
        }
    });
    //Input do bairro (4)
    $(inputBairro).on('change', function () {
        if(inputBairro.val() != ""){
            let bairro = inputBairro.val();
            msg(audio, "TOBI - Obrigado.mp3");
            $('.input-boxes').hide(0);
            $('.bairro').fadeOut(3200);
            $(audio).one("ended", function(){
                setTimeout(() => {
                    location.assign('http:\/\/okituke.com.br/okituke/redeokituke/segmentos.php?link=okituke&bairro='+bairro);
                }, 800);
            });
        }
    });
});
