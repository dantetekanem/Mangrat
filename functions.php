<?PHP

	function mangas()
	{
		// retorna um array com todos os mangás do diretório "mangas/"
		$od		= @opendir("mangas");
		while($f = @readdir($od)) {
			if(is_dir("mangas/".$f) && $f != "." && $f != "..") {
				$mangas[]	= $f;
			}
		}
		return $mangas;
	}
	
	function loadManga($manga) {
		$handle	= @opendir("mangas/".$manga);
		while($f = @readdir($handle)) {
			if($f == "Thumbs.db" || $f == "." || $f == "..") continue;
			
			// images
			$chapters[]		= array('title' => $f, 'images' => glob("mangas/".$manga."/".$f."/*.*"));
		}
		return json_encode($chapters);
	}
	
	function nextChapter($manga, $chapter) {
		$handle	= @opendir("mangas/".$manga);
		while($f = @readdir($handle)) {
			if($f == "Thumbs.db" || $f == "." || $f == "..") continue;
			
			// images
			$chapters[]		= array('title' => $f, 'images' => glob("mangas/".$manga."/".$f."/*.*"));
		}
		$useNextChap = false;
		foreach($chapters as $chap) {
			if($useNextChap == true)
				die($chap['title']);
			if($chap['title'] == $chapter) {
				$useNextChap = true;
			}
		}
	}
	
	function prevChapter($manga, $chapter) {
		$handle	= @opendir("mangas/".$manga);
		while($f = @readdir($handle)) {
			if($f == "Thumbs.db" || $f == "." || $f == "..") continue;
			
			// images
			$chapters[]		= array('title' => $f, 'images' => glob("mangas/".$manga."/".$f."/*.*"));
		}
		$prevChap = false;
		foreach($chapters as $chap) {			
			if($chap['title'] == $chapter) {
				die($prevChap);
			}
			$prevChap = $chap['title'];
		}
	}
	
	if($_GET['load'] == "mangas") {
		echo json_encode(mangas());
	}
	if($_GET['load_manga'] != "") {
		echo loadManga($_GET['load_manga']);
	}
	if($_GET['next_chapter'] != "")
		nextChapter($_GET['manga'], $_GET['next_chapter']);
	if($_GET['prev_chapter'] != "")
		prevChapter($_GET['manga'], $_GET['prev_chapter']);