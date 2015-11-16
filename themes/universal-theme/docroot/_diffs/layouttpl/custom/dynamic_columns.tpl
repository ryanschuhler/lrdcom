#set ($layout_sections = "")

#if ($layout.getExpandoBridge().hasAttribute("sections"))
	#set ($layout_sections = $stringUtil.splitLines($layout.getExpandoBridge().getAttribute("sections")))
#end

<div class="columns-1 dynamic-columns" id="main-content" role="main">
	#if (($layout_sections != "") && ($layout_sections.size() != 0))
		#foreach ($section in $layout_sections)
			#set ($section_info = $stringUtil.split($section, "::"))

			#set ($element_id = $stringUtil.replace($section_info.get(0), " ", "_"))
			#set ($element_id = $stringUtil.lowerCase($element_id))
			#set ($element_id = $htmlUtil.escape($element_id))

			#set ($css_class = "")

			#if (($velocityCount % 2) == 0)
				#set ($css_class = "alt")
			#end

			<div class="portlet-layout row-fluid">
				<div class="portlet-column portlet-column-only span12 ${css_class}" id="$element_id">
					$processor.processColumn("column-$velocityCount", "portlet-column-content portlet-column-content-only")
				</div>
			</div>
		#end
	#else
		<div class="portlet-layout row-fluid">
			<div class="portlet-column portlet-column-only span12" id="column-1">
				$processor.processColumn("column-1", "portlet-column-content portlet-column-content-only")
			</div>
		</div>
	#end
</div>