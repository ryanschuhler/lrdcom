<footer id="footer" role="contentinfo">
	<#if theme.getSetting("display-social-icons") == "true">
		<#attempt>
			<#assign custom_footer_nav = jsonFactoryUtil.createJSONArray(theme.getSetting("custom-footer-nav")) />

			<nav class="navigation">
				<#assign start = 0 />
				<#assign end = custom_footer_nav.length() - 1 />
				<#assign range = start..end />

				<#list range as i>
					<#assign json_array = custom_footer_nav.getJSONArray(i) />

					<ul class="align-center block-container justify-center">
						<#assign json_array_end = json_array.length() - 1 />
						<#assign json_array_range = start..json_array_end />

						<#list json_array_range as x>
							<#assign json_object = json_array.getJSONObject(x) />
							<#assign icon_name = json_object.getString("icon_name") />
							<#assign text = json_object.getString("text") />
							<#assign url = json_object.getString("url") />

							<#if url?has_content && (icon_name?has_content || text?has_content)>
								<li>
									<a href="${url}" target="_blank">
										<#if icon_name?has_content>
											<i class="fa ${icon_name}"></i>
										</#if>
										<#if text?has_content>
											<span>${text}</span>
										</#if>
									</a>
								</li>
							</#if>
						</#list>
					</ul>
				</#list>
			</nav>
		<#recover>
		</#attempt>
	</#if>

	<#if (custom_footer_article_id?has_content && journal_article_local_service.hasArticle(group_id, custom_footer_article_id))>
		${journal_article_local_service.getArticleContent(group_id, custom_footer_article_id, "", locale, theme_display)}
	</#if>

	<p class="copyright">
		&copy; ${the_year} Liferay Inc. <@liferay.language key="all-rights-reserved" />
	</p>
</footer>