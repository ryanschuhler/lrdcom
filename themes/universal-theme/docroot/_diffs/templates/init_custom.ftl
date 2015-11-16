<#assign css_class = css_class + " dockbar-split" />

<#assign journal_article_local_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />
<#assign layout_local_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />

<#if layout.getExpandoBridge().hasAttribute("sections")>
	<#assign layout_sections = stringUtil.splitLines(layout.getExpandoBridge().getAttribute("sections")) />
</#if>

<#assign root_css_class = root_css_class + " " + locale + " responsive" />

<#if !show_add_content>
	<#assign css_class =  stringUtil.replace(css_class, "controls-visible", "controls-hidden") />
</#if>

<#assign custom_css_article_id = theme.getSetting("custom-css-article-id") />
<#assign custom_footer_article_id = theme.getSetting("custom-footer-article-id") />

<#assign navigation_behavior = theme.getSetting("navigation-behavior") />
<#assign navigation_type = theme.getSetting("navigation-type") />

<#if theme.getSetting("open-graph-title")?has_content >
	<#assign open_graph_title = theme.getSetting("open-graph-title") />
<#else>
	<#assign open_graph_title = the_title + " - " + company_name />
</#if>

<#if theme.getSetting("open-graph-url")?has_content >
	<#assign open_graph_url = theme.getSetting("open-graph-url") />
<#else>
	<#assign open_graph_url = htmlUtil.escape(portal.getCurrentCompleteURL(request)) />
</#if>

<#macro print_navigation nav_layouts>
	<ul class="align-center block-container" role="menubar">
		<#list nav_layouts as nav_layout>
			<#assign nav_layout_attr_selected = "" />
			<#assign nav_layout_css_class = "nav-item nav-item-${nav_layout_index + 1}" />

			<#if nav_layout.isSelected(true, layout, layout.getAncestorPlid()) || nav_layout.isChildSelected(true, layout)>
				<#assign nav_layout_attr_selected = "aria-selected='true'" />
				<#assign nav_layout_css_class = nav_layout_css_class + " selected" />
			</#if>

			<li ${nav_layout_attr_selected} class="${nav_layout_css_class}" id="layout_${nav_layout.getLayoutId()}" role="presentation">
				<a aria-labelledby="layout_${layout.getLayoutId()}" href="${themeDisplay.getPortalUrl()}/${nav_layout.getFriendlyURL()}" role="menuitem">
					<span>${nav_layout.getName(locale)}</span>
				</a>
			</li>
		</#list>
	</ul>
</#macro>