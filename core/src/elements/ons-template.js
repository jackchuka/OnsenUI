/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import BaseElement from 'ons/base-element';

/**
 * @element ons-template
 * @category util
 * @description
 *   [en]Define a separate HTML fragment and use as a template.[/en]
 *   [ja]テンプレートとして使用するためのHTMLフラグメントを定義します。この要素でHTMLを宣言すると、id属性に指定した名前をpageのURLとしてons-navigatorなどのコンポーネントから参照できます。[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-template id="foobar.html">
 *   ...
 * </ons-template>
 */
class TemplateElement extends BaseElement {
  createdCallback() {
    this.template = this.innerHTML;

    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  attachedCallback() {
    var event = new CustomEvent('_templateloaded', {bubbles: true, cancelable: true});
    event.template = this.template;
    event.templateId = this.getAttribute('id');

    this.dispatchEvent(event);
  }
}

window.OnsTemplateElement = document.registerElement('ons-template', {
  prototype: TemplateElement.prototype
});
