<!DOCTYPE html>

<#include init />

<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}">

<head>
	<meta charset="utf-8" />
	<meta content="minimum-scale=1.0, width=device-width" name="viewport" />
	<meta content="liferay" property="fb:admins" />
	<meta content="${page.getDescription(locale)}" property="og:description" />

	<#if theme.getSetting("open-graph-image")?has_content>
		<meta content='${theme.getSetting("open-graph-image")}' property='og:image' />
	</#if>

	<meta content="${open_graph_title}" property="og:title" />
	<meta content="website" property="og:type" />
	<meta content="${open_graph_url}" property="og:url" />

	<title>${the_title} | Liferay</title>

	<#if theme.getSetting("typekit-id")?has_content>
		<script src="//use.typekit.net/${theme.getSetting("typekit-id")}.js" type="text/javascript"></script>

		<script type="text/javascript">
			try {
				Typekit.load();
			}
			catch (e) {
			}
		</script>
	</#if>

	${theme.include(top_head_include)}

	<script src="${javascript_folder}/class_toggle.js" type="text/javascript"></script>
	<script src="${javascript_folder}/event_onscreen.js" type="text/javascript"></script>
	<script src="${javascript_folder}/osb_form.js" type="text/javascript"></script>
	<script src="${javascript_folder}/pop_up.js" type="text/javascript"></script>

	<style >
		<#include "${full_templates_path}/css.ftl" />
	</style>
</head>

<body class="${css_class} ${navigation_behavior}-navigation">

<a class="hide-accessible" href="#main-content" id="skip-to-content"><@liferay.language key="skip-to-content" /></a>

${theme.include(body_top_include)}

<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
	<@liferay.dockbar />
</#if>

<div class="container-fluid" id="wrapper">
	<header class="element-border" id="banner" role="banner">
		<div class="align-center banner-content block-container justify-space-between no-padding">
			<#if theme.getSetting("display-logo") == "true">
				<a class="${logo_css_class}" href="${site_default_url}" title="<@liferay.language key="go-to" /> ${site_name}">
					<img alt="${logo_description}" class="small-padding-vertical standard-padding-horizontal" height="36" src="${site_logo}" />
				</a>
			</#if>

			<#if has_navigation && (navigation_type != "none")>
				<#include "${full_templates_path}/navigation.ftl" />
			</#if>
		</div>
	</header>

	<div class="content">
		<#if selectable>
			${theme.include(content_include)}
		<#else>
			${portletDisplay.recycle()}

			${portletDisplay.setTitle(the_title)}

			${theme.wrapPortlet("portlet.ftl", content_include)}
		</#if>
	</div>

	<#include "${full_templates_path}/footer.ftl" />
</div>

${theme.include(body_bottom_include)}

${theme.include(bottom_include)}

</body>

</html>