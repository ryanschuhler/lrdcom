<nav aria-label="<@liferay.language key="site-pages" />" class="navigation ${navigation_type}-navigation" id="navigation" role="navigation">
	<#if (navigation_type == "on-page") && layout_sections?? && layout_sections?has_content>
		<div class="section-nav" id="sectionNavigation">
			<ul class="align-center block-container" role="menubar">
				<#list layout_sections as section>
					<#assign section_info = stringUtil.split(section, "::") />

					<#assign section_name = "" />

					<#if section_info[0]?? && section_info[0]?has_content>
						<#assign section_name = section_info[0] />
					</#if>

					<#assign section_href = "" />

					<#if section_info[1]?? && section_info[1]?has_content>
						<#assign section_href = section_info[1] />
					</#if>

					<#assign section_attrs = "" />

					<#if section_info[2]?? && section_info[2]?has_content>
						<#assign section_attrs = section_info[2] />
					</#if>

					<#assign element_id = stringUtil.replace(section_name, " ", "_") />
					<#assign element_id = stringUtil.lowerCase(element_id) />

					<li class='nav-item nav-item-${section_index + 1} ${htmlUtil.escape(element_id)}' id="section_${section_index + 1}" role="presentation">
						<a aria-labelledby="section_${section_index + 1}" class="animate-scroll" href="${htmlUtil.escape(section_href)}" role="menuitem" ${htmlUtil.escape(section_attrs)}>
							${htmlUtil.escape(section_name)}
						</a>
					</li>
				</#list>
			</ul>
		</div>
	<#elseif navigation_type == "relative">
		<#if layout.getParentPlid() != 0>
			<#assign parent_layout = layout_local_service.fetchLayout(layout.getParentPlid()) />
			<#assign cur_layouts = parent_layout.getChildren(permissionChecker) />
		<#else>
			<#assign cur_layouts = layouts />
		</#if>

		<@print_navigation nav_layouts=cur_layouts />

		</div>
	<#elseif navigation_type == "root">
		<@print_navigation nav_layouts=layouts />
	</#if>
</nav>