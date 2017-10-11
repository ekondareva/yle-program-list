<?php
/**
 * @file
 * YLE Program List Settings.
 */

/**
 * Implements hook_admin_settings_form().
 */
function yle_program_list_admin_settings_form($form, &$form_state) {
  $form = array();

  $form['yle_program_list_global_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('YLE Program List configuration'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['yle_program_list_global_settings']['yle_program_list_app_id'] = array(
    '#type' => 'textfield',
    '#title' => t('APP ID.'),
    '#description' => t('Application ID'),
    '#default_value' => variable_get('yle_program_list_app_id', ''),
    '#disabled' => FALSE,
    '#size' => 50,
    '#maxlength' => 50,
  );
  
  $form['yle_program_list_global_settings']['yle_program_list_app_key'] = array(
    '#type' => 'textfield',
    '#title' => t('API Key.'),
    '#description' => t('Application Key.'),
    '#default_value' => variable_get('yle_program_list_app_key', ''),
    '#disabled' => FALSE,
    '#size' => 50,
    '#maxlength' => 50,
  );
  
  $form['yle_program_list_global_settings']['yle_program_list_limit'] = array(
    '#type' => 'textfield',
    '#title' => t('Limit.'),
    '#description' => t('Sets limit for the size of the returned collection'),
    '#default_value' => variable_get('yle_program_list_limit', '10'),
    '#disabled' => FALSE,
    '#size' => 3,
    '#maxlength' => 3,
  );

  return system_settings_form($form);
}
