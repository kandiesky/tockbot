/* Portugues para o Select2 */
!function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;e.define("select2/i18n/pt-BR",[],function(){return{errorLoading:function(){return"Os resultados não puderam ser carregados."},inputTooLong:function(e){var n=e.input.length-e.maximum,r="Apague "+n+" caracter";return 1!=n&&(r+="es"),r},inputTooShort:function(e){return"Digite "+(e.minimum-e.input.length)+" ou mais caracteres"},loadingMore:function(){return"Carregando mais resultados…"},maximumSelected:function(e){var n="Você só pode selecionar "+e.maximum+" ite";return 1==e.maximum?n+="m":n+="ns",n},noResults:function(){return"Nenhum resultado encontrado"},searching:function(){return"Buscando…"},removeAllItems:function(){return"Remover todos os itens"}}}),e.define,e.require}();
/* Verificar se está no mobile ou não para ativar voz */
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var voz = new SpeechSynthesisUtterance();
    voz.lang = 'pt-BR';
    vozAtivo = 1;
}else{
    vozAtivo = 0;
}
/* MENSAGEM ESCRITA */
function msg(m) {
    $(msgBub).html("");
    
    msgBub.html(m.substr(0, msgLen++));
    if(msgLen < m.length+1) {
        msgExec = setTimeout('msg(\"'+m+'\")', 40);
    } else {
        msgLen = 0;
        m = '';
    }
}
function callBairro(r){
    $(inputEstado).val(null).html(null);
    $('.preloader').fadeOut(0, function(){
        r.forEach(item => {
            let opt = new Option(item[0], item[1])
            $(inputEstado).append(opt)
        })
        inputEstado.select2({
            language: "pt-BR",
            allowClear: true,
        });
    })
}
const frases = {
    "oi": "Olá, eu sou Tob. Robô Guia da plataforma Okituké. Selecione abaixo o Estado o qual deseja Informações.",
    "erro1": "OK, entendi. No momento, esse estado não possui anunciantes. Caso queira anunciar, clique abaixo!",
    "erro2": "OK, entendi. No momento, esta cidade não possui anunciantes. Caso queira anunciar, clique abaixo!",
    "sucesso1": "Certo! Agora selecione sua cidade...",
    "sucesso2": "Ótimo! Por último, selecione seu bairro...",
    "obrigado": "OK! Entendi! Agora, vou redirecionar você para o local escolhido. Caso não tenha anunciantes, você poderá nos representar neste local e ganhar um bom dinheiro divulgando e cadastrando interessados. Se for o seu caso, clique agora no botão ANUNCIAR para se candidatar!",
    "falhaInternet": "Houve um problema com a conexão. Tente novamente por favor!"
}
$(document).ready(function() {
    msgBub = $('.bot-msg');
    let inputEstado = $('.estado select');
    let inputCidade = $('.cidade select');
    let inputBairro = $('.bairro select');
    
    //location.assign(link)

    //Botão de start
    $('#start').on('click', function () {
        $('#start').fadeOut(0, function(){
           $('#home').hide();
           $('.input-boxes').fadeIn(200);
            $('.estado').fadeIn(0, function(){
                msgLen = 0;
                msg(frases["oi"]);
                if(vozAtivo == 1){
                    voz.text = frases["oi"];
                    speechSynthesis.speak(voz);
                }
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
                            $('.preloader').fadeOut(500, function(){
                                $(inputEstado).val("");
                                $('.estado').fadeIn(0);
                                msgLen = 0;
                                clearTimeout(msgExec);
                                msg(frases["erro1"]);
                                if(vozAtivo == 1){
                                    voz.text = frases["erro1"];
                                    SpeechSynthesis.cancel()
                                    speechSynthesis.speak(voz);
                                }
                                $('.estado').fadeOut(0, function(){
                                    $('#btn-con').attr("href", "http://okituke.com.br/okituke/form-cadastro.php?segmento=avbnsdobrasil&estado="+estado).fadeIn(0, function(){
                                        $('#btn-reset').fadeIn(1500);
                                    });
                                })
                            })
                        }else{
                            msgLen = 0;
                            clearTimeout(msgExec);
                            msg(frases["sucesso1"]);
                            if(vozAtivo == 1){
                                voz.text = frases["sucesso1"];
                                SpeechSynthesis.cancel()
                                speechSynthesis.speak(voz);
                            }
                            $(inputEstado).val(null).html(null);
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
    //Input da cidade (2 input)
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
                            $('.preloader').fadeOut(600, function(){
                                $('.cidade').fadeIn(0);
                                msgLen = 0;
                                clearTimeout(msgExec);
                                msg(frases["erro2"]);
                                if(vozAtivo == 1){
                                    voz.text = frases["erro2"];
                                    SpeechSynthesis.cancel()
                                    speechSynthesis.speak(voz);
                                }
                                $('.cidade').fadeOut(0, function(){
                                    $('#btn-con').attr("href", "http://okituke.com.br/okituke/form-cadastro.php?segmento=avbnsdobrasil&cidade="+cidade).fadeIn(0, function(){
                                        $('#btn-reset').fadeIn(1500);
                                    });
                                })
                            })
                        }else{
                            msgLen = 0;
                            clearTimeout(msgExec);
                            msg(frases["sucesso2"]);
                            if(vozAtivo == 1){
                                voz.text = frases["sucesso2"];
                                SpeechSynthesis.cancel()
                                speechSynthesis.speak(voz);
                            }
                            $(inputCidade).val(null).html(null);
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
    //Input do bairro (3 e último input)
    $(inputBairro).on('change', function () {
        if(inputBairro.val() != ""){
            let bairro = inputBairro.val();
            msg(frases['obrigado']);
            $('.input-boxes').hide(0);
            $('.bairro').fadeOut(0, function(){
                $('#btn-bm').attr("href", "http://okituke.com.br/okituke/redeokituke/segmentos.php?link=okituke&bairro="+bairro).fadeIn(0, function(){
                    $('#btn-con').attr("href", "http://okituke.com.br/okituke/form-cadastro.php?segmento=avbnsdobrasil").fadeIn(0);
                    $('#btn-reset').fadeIn(1500);
                });
            })
        }
    });
});
