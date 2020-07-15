$(function() {

    // 子カテゴリーを追加する
    function buildChildHTML(child){
      var html =`<a class="child_category" id="${child.id}" 
                  href="#">${child.name}</a>`;
      return html;
    }

    // 孫カテゴリを追加する。子要素と同じ動き
    function buildGrandChildHTML(child){
      var html =`<a class="grand_child_category" id="${child.id}"
                 href="#">${child.name}</a>`;
      return html;
    }

  //「カテゴリー」テキストにマウスが乗った時の処理
    $(".nav__left__category__title").on("mouseover", function() {
      $('.nav__left__category__title').css('font-weight','bold')
      $(".selected-parent").removeClass("selected-parent")//背景色をつけるために設定済みのクラスを配置する。まずは初期化
      $(".child_category").remove();//一度子カテゴリを削除することで「カテゴリー」テキストにマウスが乗るたびに親カテゴリのみ表示される。
      $(".grand_child_category").remove();//孫カテゴリも削除する。理由は同上
    });
    $(".nav__left__category__title").on("mouseout", function() {
      $('.nav__left__category__title').css('font-weight','normal')
    });
  //


    $(".parent_category").on("mouseover", function() {
      var id = this.id//どのリンクにマウスが乗ってるか
      $(".selected-parent").removeClass("selected-parent")//背景色をつけるために設定済みのクラスを配置する。まずは初期化
      $('#' + id).addClass("selected-parent");//選択したカテゴリーに色を付けるクラスを付与
      $(".child_category").remove();//子カテゴリを削除する。これをしないと親カテゴリ内で移動した時に子カテゴリが縦に並んでしまう。
      $(".grand_child_category").remove();//孫カテゴリも削除する。
      $('.nav__left__category__title').css('font-weight','bold')//「カテゴリ」テキストを太字のままにしておく
      $.ajax({
        type: 'GET',
        url: '/tops/get_header_category_children',
        data: {parent_id: id},
        dataType: 'json'
      }).done(function(children) {
        children.forEach(function (child) {//帰ってきた子カテゴリー（配列）
          var html = buildChildHTML(child);//HTMLにして
          $(".children_list").append(html);//リストに追加します
        })
      });
    });

    $(".category_list").on("mouseover", function() {
      $('.nav__left__category__title').css('font-weight','bold')
    });
    $(".category_list").on("mouseout", function() {
      $('.nav__left__category__title').css('font-weight','normal')
    });




    //子カテゴリからカーソルが離れた時に孫カテゴリと子カテゴリを削除する
    // $(".nav__left__category").on("mouseover", function() {
    //   c = $(".child_category").remove();//一度子カテゴリを
    //   g = $(".grand_child_category").remove();//孫カテゴリも
    //   $(".parent_category").on("mouseover", function() {
    //     $(".child_category").append(c)
    //   });
    // });
    //孫カテゴリからカーソルが離れた時に孫カテゴリと子カテゴリを削除する
    // $(".grand_children_list").on("mouseout", function() {
    //   c = $(".child_category").remove();//一度子カテゴリを
    //   g = $(".grand_child_category").remove();//孫カテゴリも
    //   $(".parent_category").on("mouseover", function() {
    //     $(".child_category").append(c)
    //   });
    //   $(".child_category").on("mouseover",function(){
    //     $(".grand_child_category").append(g)
    //   });
    // });
    

  
    $(document).on("mouseover", ".child_category", function () {//子カテゴリーのリストは動的に追加されたHTMLである
      var id = this.id
      $(".selected-child").removeClass("selected-child")//親カテゴリ同様背景色をつけるために設定済みのクラスを配置する。まずは初期化
      $('#' + id).addClass("selected-child");//選択したカテゴリーに色を付けるクラスを付与
      $.ajax({
        type: 'GET',
        url: '/tops/get_header_category_grandchildren',
        data: {child_id: id},
        dataType: 'json'
      }).done(function(children) {
        children.forEach(function (child) {
          var html = buildGrandChildHTML(child);
          $(".grand_children_list").append(html);
        })
        $(document).on("mouseover", ".child_category", function () {
          $(".grand_child_category").remove();
        });
      });
    });  
  });