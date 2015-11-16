<#-- Base -->

.aui body {
	color: ${theme.getSetting("color-font")};
	font: ${theme.getSetting("body-font")};
}

.aui a {
	color: ${theme.getSetting("color-secondary")};
}

.aui a:hover, .nav-item.selected a {
	color: ${theme.getSetting("color-accent")};
}

.aui h1, .aui h2, .aui h3 {
	color: ${theme.getSetting("color-alt-font")};
}

.aui h1 {
	font-size: ${theme.getSetting("h1-size")};
}

.aui h2 {
	font-size: ${theme.getSetting("h2-size")};
}

.aui h3 {
	font-size: ${theme.getSetting("h3-size")};
}

<#-- Colors -->

.aui #wrapper .accent-background {
	background-color: ${theme.getSetting("color-accent")};
	fill: ${theme.getSetting("color-accent")};
}

.aui #wrapper .accent-border {
	border-color: ${theme.getSetting("color-accent")};
}

.aui #wrapper .accent-color {
	color: ${theme.getSetting("color-accent")};
	stroke: ${theme.getSetting("color-accent")};
}

.aui #wrapper .alt-font-background {
	background-color: ${theme.getSetting("color-alt-font")};
	fill-color: ${theme.getSetting("color-alt-font")};
}

.aui #wrapper .alt-font-border {
	border-color: ${theme.getSetting("color-alt-font")};
}

.aui #wrapper .alt-font-color {
	color: ${theme.getSetting("color-alt-font")};
	stroke: ${theme.getSetting("color-alt-font")};
}

.aui #wrapper .alt-primary-background {
	background-color: ${theme.getSetting("color-alt-primary")};
	fill: ${theme.getSetting("color-alt-primary")};
}

.aui #wrapper .alt-primary-border {
	border-color: ${theme.getSetting("color-alt-primary")};
}

.aui #wrapper .alt-primary-color {
	color: ${theme.getSetting("color-alt-primary")};
	stroke: ${theme.getSetting("color-alt-primary")};
}

.aui #wrapper .alt-secondary-background {
	background-color: ${theme.getSetting("color-alt-secondary")};
	fill: ${theme.getSetting("color-alt-secondary")};
}

.aui #wrapper .alt-secondary-border {
	border-color: ${theme.getSetting("color-alt-secondary")};
}

.aui #wrapper .alt-secondary-color {
	color: ${theme.getSetting("color-alt-secondary")};
	stroke: ${theme.getSetting("color-alt-secondary")};
}

.aui #wrapper .complementary-background {
	background-color: ${theme.getSetting("color-complementary")};
	fill: ${theme.getSetting("color-complementary")};
}

.aui #wrapper .complementary-border {
	border-color: ${theme.getSetting("color-complementary")};
}

.aui #wrapper .complementary-color {
	color: ${theme.getSetting("color-complementary")};
	stroke: ${theme.getSetting("color-complementary")};
}

.aui #wrapper .element-background {
	background-color: ${theme.getSetting("color-element")};
	fill: ${theme.getSetting("color-element")};
}

.aui #wrapper .element-border {
	border-color: ${theme.getSetting("color-element")};
}

.aui #wrapper .element-color {
	color: ${theme.getSetting("color-element")};
	stroke: ${theme.getSetting("color-element")};
}

.aui #wrapper .font-background {
	background-color: ${theme.getSetting("color-font")};
	fill: ${theme.getSetting("color-font")};
}

.aui #wrapper .font-border {
	border-color: ${theme.getSetting("color-font")};
}

.aui #wrapper .font-color {
	color: ${theme.getSetting("color-font")};
	stroke: ${theme.getSetting("color-font")};
}

.aui #wrapper .light-background {
	background-color: ${theme.getSetting("color-light")};
	fill: ${theme.getSetting("color-light")};
}

.aui #wrapper .light-border {
	border-color: ${theme.getSetting("color-light")};
}

.aui #wrapper .light-color {
	color: ${theme.getSetting("color-light")};
	stroke: ${theme.getSetting("color-light")};
}

.aui #wrapper .primary-background {
	background-color: ${theme.getSetting("color-primary")};
	fill: ${theme.getSetting("color-primary")};
}

.aui #wrapper .primary-border {
	border-color: ${theme.getSetting("color-primary")};
}

.aui #wrapper .primary-color {
	color: ${theme.getSetting("color-primary")};
	stroke: ${theme.getSetting("color-primary")};
}

.aui #wrapper .secondary-background {
	background-color: ${theme.getSetting("color-secondary")};
	fill: ${theme.getSetting("color-secondary")};
}

.aui #wrapper .secondary-border {
	border-color: ${theme.getSetting("color-secondary")};
}

.aui #wrapper .secondary-color {
	color: ${theme.getSetting("color-secondary")};
	stroke: ${theme.getSetting("color-secondary")};
}

<#-- Utility -->

.aui #main-content, #main-content.column-1 .portlet-boundary, .max-full {
	max-width: ${theme.getSetting("max-full")};
}

.aui #wrapper .standard-padding, .aui .block-container, .aui .block-container .block.middle-block {
	padding: ${theme.getSetting("padding-standard")};
}

.aui #wrapper .large-padding {
	padding: ${theme.getSetting("padding-large")};
}

.aui #wrapper .large-padding-horizontal {
	padding-left: ${theme.getSetting("padding-large")};
	padding-right: ${theme.getSetting("padding-large")};
}

.aui #wrapper .large-padding-vertical {
	padding-bottom: ${theme.getSetting("padding-large")};
	padding-top: ${theme.getSetting("padding-large")};
}

.aui #wrapper .small-padding {
	padding: ${theme.getSetting("padding-small")};
}

.aui #wrapper .small-padding-horizontal {
	padding-left: ${theme.getSetting("padding-small")};
	padding-right: ${theme.getSetting("padding-small")};
}

.aui #wrapper .small-padding-vertical {
	padding-bottom: ${theme.getSetting("padding-small")};
	padding-top: ${theme.getSetting("padding-small")};
}

.aui #wrapper .standard-padding-horizontal {
	padding-left: ${theme.getSetting("padding-standard")};
	padding-right: ${theme.getSetting("padding-standard")};
}

.aui #wrapper .standard-padding-vertical {
	padding-bottom: ${theme.getSetting("padding-standard")};
	padding-top: ${theme.getSetting("padding-standard")};
}

.aui .block-container .block.left-block {
	padding-right: ${theme.getSetting("padding-standard")};
}

.aui .block-container .block.right-block {
	padding-left: ${theme.getSetting("padding-standard")};
}

.aui .max-full, .aui .max-large, .aui .max-medium, .aui .max-small {
	padding: 0 ${theme.getSetting("padding-standard")};
}

.aui .max-large {
	max-width: ${theme.getSetting("max-large")};
}

.aui .max-medium {
	max-width: ${theme.getSetting("max-medium")};
}

.aui .max-small {
	max-width: ${theme.getSetting("max-small")};
}

<#-- Custom -->

<#if (custom_css_article_id?has_content && journal_article_local_service.hasArticle(group_id, custom_css_article_id))>
	${htmlUtil.escape(journal_article_local_service.getArticleContent(group_id, custom_css_article_id, "", locale, theme_display))}
</#if>