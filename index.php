<?PHP

	require "functions.php";

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
	"http://www.w3.org/TR/html4/strict.dtd">
<head>
	<meta http-equiv="Content-type" content="text/html; charset=iso-8859-1">
	<title>Mangrat - Manga Reader for Web</title>
	<link rel="stylesheet" href="stylesheets/mangrat.css" type="text/css" media="screen" />
	<script src="javascripts/jquery.js" type="text/javascript"></script>
	<script src="javascripts/jquery.preloadImages.js" type="text/javascript"></script>
	<script src="javascripts/jquery.mousewheel.js" type="text/javascript"></script>
	<script src="javascripts/mangrat.js" type="text/javascript"></script>
	
</head>
<html>
	<body>
		
		<div id="topo">
			<div id="logo"><a href="/mangrat/" title="Mangrat - Manga Reader for Web"><img src="images/logo.jpg" /></a></div>
			<div id="text">
			Manga Reader for Web
			</div>
			<div id="more-info">
				<a href="javascript:;">+ Painel</a>
			</div>
		</div>
		<div id="infos">	
			<div id="left">
			</div>
			<div id="right">
				<h2>Teclas</h2>
				<p><b>Setas:</b> Servem para mover a imagem</p>
				<p><b>Shift + Seta esquerda:</b> Volta para a página anterior.</p>
				<p><b>Shift + Seta direita:</b> Vai para a próxima página.</p>
				<p><b>Esc:</b> Abre e fecha o painel.</p>
				<p><b>M:</b> Abre e fecha o menu para ler um novo mangá.</p>
				<p><b>F11:</b> Tela cheia.</p>
			</div>		
		</div>
		<div id="manga">..</div>
		<div id="loading">Carregando...</div>
		<div id="manga-select">
			<b>Selecione um mangá para ler:</b>
			<? foreach(mangas() as $manga): ?>
			<a href="#/<?= $manga ?>" class="manga"><?= $manga ?></a>
			<? endforeach ?>
			<b>--</b>
		</div>
		
		<div id="bottom">
			Mangrat é um projeto open-source criado para facilitar a leitura de mangás on-line. Seu código pode ser encontrado em <a href="http://github.com/dantetekanem/Mangrat" target="_blank">http://github.com/dantetekanem/Mangrat</a>. Ele foi criado por <a href="http://www.leonardopereira.com" target="_blank">Leonardo Pereira</a>.
		</div>
		
	</body>
</html>