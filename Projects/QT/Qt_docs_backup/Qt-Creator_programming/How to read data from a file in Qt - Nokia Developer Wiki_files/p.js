/**
 *  -----------------------------------------------
 *  Publish Pages (Jan 10, 2014)
 *  -----------------------------------------------
 */
$(document).ready(function() {
// Constants
    var p_language_names = {'aa':'Afar','ab':'Abkhazian','af':'Afrikaans','sq':'Albanian','am':'Amharic','ar':'Arabic','hy':'Armenian','as':'Assamese','ay':'Aymara','az':'Azerbaijani','ba':'Bashkir','be':'Byelorussian','bg':'Bulgarian','bh':'Bihari','bi':'Bislama','bn':'Bengali/Bangla','dz':'Bhutani','my':'Burmese','br':'Breton','km':'Cambodian','ca':'Catalan','co':'Corsican','hr':'Croatian','cs':'Czech','da':'Danish','nl':'Dutch','en':'English','eo':'Esperanto','et':'Estonian','eu':'Basque','fa':'Farsi','fi':'Finnish','fj':'Fiji','fo':'Faroese','fr':'French','fy':'Frisian','gd':'Gaelic','gl':'Galician','de':'German','el':'Greek','kl':'Greenlandic','gn':'Guarani','gu':'Gujarati','ha':'Hausa','he':'Hebrew','hi':'Hindi','hu':'Hungarian','ga':'Irish','ia':'Interlingua','ie':'Interlingue','ik':'Inupiak','id':'Indonesian','is':'Icelandic','it':'Italian','iu':'Inuktitut','ja':'Japanese','jv':'Javanese','kk':'Kazakh','kn':'Kannada','ko':'Korean','ks':'Kashmiri','rn':'Kurundi','rw':'Kinyarwanda','ku':'Kurdish','ky':'Kirghiz','la':'Latin','ln':'Lingala','lo':'Laothian','lt':'Lithuanian','lv':'Latvian;Lettish','mg':'Malagasy','mi':'Maori','mk':'Macedonian','ml':'Malayalam','mn':'Mongolian','mo':'Moldavian','mr':'Marathi','ms':'Malay','mt':'Maltese','na':'Nauru','nb':'Bokmål','ne':'Nepali','no':'Norwegian','oc':'Occitan','om':'Afan (Oromo)','or':'Oriya','pa':'Punjabi','pl':'Polish','ps':'Pashto/Pushto','pt':'Portuguese','qu':'Quechua','rm':'Rhaeto-Romance','ro':'Romanian','ru':'Russian','rw':'Kinyarwanda','sa':'Sanskrit','sd':'Sindhi','sg':'Sangho','sh':'Serbo-Croatian','si':'Singhalese','sk':'Slovak','sl':'Slovenian','sm':'Samoan','sn':'Shona','sr':'Serbian','ss':'Siswati','st':'Sesotho','so':'Somali','es':'Spanish','su':'Sundanese','sv':'Swedish','sw':'Swahili','ta':'Tamil','te':'Telugu','tg':'Tajik','th':'Thai','bo':'Tibetan','ti':'Tigrinya','tk':'Turkmen','tl':'Tagalog','tn':'Setswana','to':'Tonga','tr':'Turkish','ts':'Tsonga','tt':'Tatar','tw':'Twi','ug':'Uigur','uk':'Ukrainian','ur':'Urdu','uz':'Uzbek','vi':'Vietnamese','vo':'Volapuk','cy':'Welsh','wo':'Wolof','xh':'Xhosa','yi':'Yiddish','yo':'Yoruba','za':'Zhuang','zh':'Chinese','zu':'Zulu'};

    var NPAERR_NO_FILES_UPLOADED            = -2000;
    var NPAERR_FILE_TOO_BIG                 = -2100;
    var NPAERR_INVALID_FILE_TYPE            = -2200;
    var NPAERR_INVALID_APK_FILE             = -2210;
    var NPAERR_INVALID_APK_FILE_IAPTYPE     = -2211;
    var NPAERR_INVALID_APK_FILE_VERSIONCODE = -2212;
    var NPAERR_INVALID_APK_FILE_MANIFEST    = -2213;
    var NPAERR_INVALID_IMAGE_FILE           = -2220;
    var NPAERR_WRONG_IMAGE_SIZE             = -2221;
    var NPAERR_INVALID_INPUT                = -3100;
    var NPAERR_PACKAGE_NAME_EXIST           = -3110;
    var NPAERR_DISPLAY_NAME_EXIST           = -3120;
    var NPAERR_INVALID_URL                  = -3130;

// Page dirty warnings
    if (typeof(p_warn_on_exit) !== 'undefined' && p_warn_on_exit) {
        $(window).on('beforeunload', function() {
            if (p_warn_on_exit) {
                return "Any progress made will be lost.";
            }
        });
    }

// Radio selections
    var selectShow = function(selector, showValue, showBlockSelector, errorClearSelector) {
        $(selector).on('change', function() {
            var rb = $(this);
            setTimeout(function() {
                if (rb.is(":checked")) {
                    if (rb.attr('value') == showValue) {
                        $(showBlockSelector).show();
                    } else {
                        $(showBlockSelector).hide();
                    }
                }
            }, 1);

            if (errorClearSelector) {
                $(errorClearSelector).removeClass('error');
            }
        });
        if ($(selector + '[value=' + showValue + ']').is(':checked')) {
            $(showBlockSelector).show();
        } else {
            $(showBlockSelector).hide();
        }
    };
    selectShow('.p-new-c-radio', 'select', '.p-c-select-body');
    selectShow('.p-new-enc-radio', 'yes', '.p-app-encryption-additional', 'div.p-enc-included');
    selectShow('.p-new-enctask-radio', 'no', '.p-app-encryption-eccn', 'div.p-enc-nonstandard');

    var calculateAgeRating = function() {
        var ageRating = 0;
        $('input.p-new-agerating:checked').each(function() {
            var ar = parseInt($(this).attr('data-p-agerating'));
            if (ar > ageRating) {
                ageRating = ar;
            }
        });
        $('#p-current-agerating').text(ageRating);
    };
    calculateAgeRating();

    $('input.p-new-p-data-radio, input.p-new-p-info-radio').on('change', function() {
        $(this).parents('div').eq(0).removeClass('error');
    });

    $('input.p-new-agerating').on('change', function() {
        $(this).parents('tr').eq(0).removeClass('error');
        calculateAgeRating();
    });

    $('div.p-info').on('click', function() {
        var hide = $(this).hasClass('show');
        $('div.p-info').removeClass('show');
        if (!hide) {
            $(this).addClass('show');
        }
    });

    $(".p-profile-cs").on('change', function() {
        var rb = $(this);
        setTimeout(function() {
            if (rb.is(":checked")) {
                if (rb.attr('value') == 'corporate') {
                    $('.p-profile-cs-corporate').show();
                } else {
                    $('.p-profile-cs-corporate').hide();
                }
            }
        }, 1);
    });

    if ($('.p-profile-cs[value=corporate]').is(':checked')) {
        $('.p-profile-cs-corporate').show();
    } else {
        $('.p-profile-cs-corporate').hide();
    }
    
    if ($('.p-new-c-radio[value=select]').is(':checked')) {
        $('.p-c-select-body').show();
    } else {
        $('.p-c-select-body').hide();
    }

    var checkECCN = function() {
        var eccn = $("#p-enc-eccn").val();
        var validEccn = ['EAR99','5D992','5D992.a','5D992.b','5D992.c','7D994']
        var valid = false;
        $.each(validEccn, function(idx, e) {
            if (eccn.toLowerCase() == e.toLowerCase()) {
                valid = true;
                return false;
            }
        });

        if (valid) {
            $('#p-enc-eccn').removeClass('error').addClass('success');
        } else {
            $('#p-enc-eccn').addClass('error').removeClass('success');
        }

        return valid;
    };
    $("#p-enc-eccn-check").on('click', function(e) {
        e.preventDefault();
        checkECCN();
    });

// Form validation
    var hasError = false;
    var scrolled = false;

    var emailValid = function(email) {
        if (email.length > 100) { return false; }
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
    };

    var urlValid = function(url) {
        return /((http?|https?):\/\/)?[a-z0-9]{3}([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?/.test(url);
    }

    var scrollError = function(e) {
        if (!scrolled) {
            // Expand all sections
            $('.p-expandables section').addClass('active').find('p.title').addClass('exp');
            // Scroll to field position
            e.focus();
            $('html, body').animate({
                scrollTop: (e.offset().top - 100)
            }, 300);
            scrolled = true;
        }
    };

    var setError = function(e, error, errorClass) {
        errorClass = errorClass || "error";
        if (error) {
            e.addClass(errorClass);
            hasError = true;
            scrollError(e);
        } else {
            e.removeClass('error');
        }
    };
    var checkEmpty = function(s, errSelector, errText, minLength) {
        var e = $(s);
        var isEmpty = (e.val().length == 0 || e.val() == '');
        var isShort = minLength && (e.val().length < minLength);
        if ((isEmpty || isShort) && errSelector && errText) {
            $(errSelector).text(errText);
        }
        setError(e, isEmpty || isShort);
    };

    $('.p-reoi').on('change keyup', function(e) {
        $(this).removeClass('error');
    });

    var setCounter = function(e) {
        if (e.length) {
            e.next('div.p-counter').text(e.val().length + '(' + e.attr('maxlength') + ')');
        }
    };
    $('#p-app-name, #p-app-description').on('change keyup', function(e) {
        $(this).removeClass('error');
        setCounter($(this));
    });
    setCounter($('#p-app-description'));
    setCounter($('#p-app-name'));

// New app form validation
    $("#p-action-cancel, input.p-sub-continue").click( function(e) {
        e.preventDefault();
        window.location.href = p_publish_url;
    });

    $("#p-action-continue").click( function(e) {
        e.preventDefault();
        if (!$(this).hasClass('disabled')) {
            $("#p-stepnum").removeClass("p-stepone").addClass("p-steptwo");
            window.scrollTo(0,0);
        }
    });

    $("#p-action-back").click( function(e) {
        e.preventDefault();
        $("#p-stepnum").removeClass("p-steptwo").addClass("p-stepone");
        window.scrollTo(0,0);
    });

    $('#p-app-encryption-dist').on('change', function(e) {
        $(this).parent().removeClass('error');
    });

    $('#p-app-email').on('change', function(e) {
        if (!emailValid($(this).val())) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });

    $('#p-app-web').on('change', function(e) {
        if ($(this).val().length && !urlValid($(this).val())) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });

    $('#p-app-category').on('change', function(e) {
        $('#p-app-category + div.custom.dropdown').removeClass('error');
    });

    $('#p-action-submit').on('click', function(e) {
        e.preventDefault();

        hasError = false;
        scrolled = false;

        $('div.p-i.p-i-s-error').removeClass('p-i-s-error').addClass('p-i-s-empty');

        setError($('#p-app-category + div.custom.dropdown'), !$('#p-app-category').val());
        checkEmpty('#p-app-name', '#p-app-name + label.error', 'Name is missing');
        checkEmpty('#p-app-description', '#p-app-description + label.error', 'Description is missing');
        checkEmpty('#p-app-keywords');

        $('div.p-i').each(function() {
            setError($(this), !$(this).hasClass('p-i-s-image'));
        });

        var distSelect = $('input.p-new-c-radio[value=select] + span.custom.radio');
        if (distSelect.hasClass('checked')) {
            setError($('#p-c-l'), $('#p-c-l').children().length === 0);
        }

        setError($('#p-app-email'), !emailValid($('#p-app-email').val()));
        setError($('#p-app-web'), $('#p-app-web').val().length && !urlValid($('#p-app-web').val()));

        setError($('div.p-yn-p-info'), ($('input.p-new-p-info-radio + span.custom.radio.checked').length == 0));
        setError($('div.p-yn-p-data'), ($('input.p-new-p-data-radio + span.custom.radio.checked').length == 0));
        setError($('div.p-enc-included'), ($('input.p-new-enc-radio + span.custom.radio.checked').length == 0));
        if ($('input.p-new-enc-radio[value=yes] + span.custom.radio.checked').length) {
            setError($('div.p-enc-nonstandard'), ($('input.p-new-enctask-radio + span.custom.radio.checked').length == 0));
            if ($('input.p-new-enctask-radio[value=no] + span.custom.radio.checked').length) {
                if (!checkECCN()) {
                    scrollError($('#p-enc-eccn'));
                }
            }
        }
        setError($('.p-cb-label[for=p-app-encryption-dist]'), !$('#p-app-encryption-dist').is(':checked'));

        $('table.p-new-agerating tr[id^=p-ar-q-]').each(function() {
            setError($(this), ($(this).find('input.p-new-agerating + span.custom.radio.checked').length == 0));
        });

        if (!hasError) {
            submitNewContent();
        }
    });

// Profile form validation
    $('#p-profile-tnc').on('change', function(e) {
        $(this).parent().removeClass('error');
    });

    $('#p-profile-email').on('change', function(e) {
        if (!emailValid($(this).val())) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });

    $('#p-profile-companywebsite').on('change', function(e) {
        if (!urlValid($(this).val())) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });

    $('#p-profile-country').on('change', function(e) {
        $('#p-profile-country + div.custom.dropdown').removeClass('error');
    });

    $('#p-profile-rcaptcha').on('click', function(e) {
        e.preventDefault();
        $('#p-profile-captcha-img').html('Loading...');
        $.ajax({
            type: 'POST',
            url: '?ACT=' + $('#p-action-id').text() + "&___=create_captcha",
            success: function(data) {
                var r = null;
                try {
                    r = data.responseJSON || $.parseJSON(data);
                } catch(e) {
                }
                if (r && r.code === 0) {
                    $('#p-profile-captcha-img').html(r.data);
                    $('#p-profile-captcha').val('');
                } else {
                    $('#p-profile-captcha-img').html('Error');
                }
            },
            error: function(xhr, status, error) {
                $('#p-profile-captcha-img').html('Error');
            }
        });
    });

    $('#p-profile-action-save').on('click', function(e) {
        e.preventDefault();

        hasError = false;
        scrolled = false;

        $('div.p-i.p-i-s-error').removeClass('p-i-s-error').addClass('p-i-s-empty');

        var corpcb = $('input.p-profile-cs[value=corporate] + span.custom.radio');
        if (corpcb.hasClass('checked')) {
            setError($('#p-profile-companywebsite'), !urlValid($('#p-profile-companywebsite').val()));
            var icon = $('.p-profile-cs-corporate div.p-i-icon');
            setError(icon, !icon.hasClass('p-i-s-image'));
        }

        checkEmpty('#p-profile-name', '#p-profile-name + label.error', 'Name is missing');
        checkEmpty('#p-profile-desc');
        checkEmpty('#p-profile-firstname');
        checkEmpty('#p-profile-lastname');
        setError($('#p-profile-email'), !emailValid($('#p-profile-email').val()));
        checkEmpty('#p-profile-phone');
        checkEmpty('#p-profile-address');
        checkEmpty('#p-profile-postal', '#p-profile-postal + label.error', 'Invalid postal code', 3);
        checkEmpty('#p-profile-city');
        setError($('#p-profile-country + div.custom.dropdown'), !$('#p-profile-country').val());
        setError($('.p-cb-label'), !$('#p-profile-tnc').is(':checked'));
        checkEmpty('#p-profile-captcha', '#p-profile-captcha + label.error', 'Image text is missing');

        if (!hasError) {
            submitNewPublisher();
        }
    });

// AJAX
    var submittingPublisher = false;
    var submitNewPublisher = function() {
        if (submittingPublisher) { return; }

        var setSubmitting = function(submitting) {
            if (submitting) {
                submittingPublisher = true;
                $('#p-submit-error').hide();
                $('#p-profile-action-save').addClass('disabled');
                $('#p-profile-action-save span.p-action').text('Saving');
                $('#p-profile-action-save img.arrow').attr('src', '/a/img/loading.gif');
            } else {
                submittingPublisher = false;
                $('#p-profile-action-save').removeClass('disabled');
                $('#p-profile-action-save span.p-action').text('Save');
                $('#p-profile-action-save img.arrow').attr('src', '/a/img/blue-circle-arrow-r.png');
            }
        };
        setSubmitting(true);

        var req = {
            name: $('#p-profile-name').val(),
            description: $('#p-profile-desc').val(),
            logoFileName: $('div.p-i-icon div.p-i-image img').attr('data-filename'),
            displayName: $('#p-profile-name').val(),
            description: $('#p-profile-desc').val(),
            businessPhone: $('#p-profile-phone').val(),
            businessEmail: $('#p-profile-email').val(),
            contactPersonFirstName: $('#p-profile-firstname').val(),
            contactPersonLastName: $('#p-profile-lastname').val(),
            contactEmail: $('#p-profile-email').val(),
            contactPhone: $('#p-profile-phone').val(),
            contactAddress: $('#p-profile-address').val(),
            contactPostalCode: $('#p-profile-postal').val(),
            contactCity: $('#p-profile-city').val(),
            contactProvinceRegion: $('#p-profile-province').val(),
            contactState: $('#p-profile-state').val(),
            contactCountry: $('#p-profile-country').val(),
            tncId: $('#p-tnc-id').text(),
            captcha: $('#p-profile-captcha').val()
        };
        if ($('#p-at-personal').is(':checked')) {
            req.type = 'personal';
        } else {
            req.type = 'corporate';
            req.vatCountry = $('#p-profile-country').val();
            req.vatNumber = $('#p-profile-vat').val();
            req.contactWebsite = $('#p-profile-companywebsite').val();
        }

        $('#p-submit-error label.error').text('There was a problem submitting your request. Please try again later or contact support.');
        $.ajax({
            type: 'POST',
            url: '?ACT=' + $('#p-action-id').text() + "&___=create_publisher",
            data: JSON.stringify(req),
            contentType: 'text/plain',
            success: function(data) {
                setSubmitting(false);
                var r = null;
                try {
                    r = data.responseJSON || $.parseJSON(data);
                } catch(e) {
                }
                if (r) {
                    if (r.code === 0) {
                        p_warn_on_exit = false;
                        window.location.href = p_publish_url;
                    } else if (r.code === NPAERR_INVALID_INPUT) {
                        scrolled = false;
                        var checkInput = function(s, errText) {
                            var elem = $(s);
                            elem.siblings('label.error').eq(0).text(errText);
                            elem.addClass('error');
                            scrollError(elem);
                        }
                        var errorShown = false;
                        $.each(r.data, function(idx, err) {
                            if (idx === '___captcha') {
                                $('#p-profile-captcha-img').html(err);
                                $('#p-profile-captcha').val('');
                            } else {
                                switch (err.field) {
                                    case 'contactPostalCode':
                                        checkInput('#p-profile-postal', err.error);
                                        errorShown = true;
                                        break;
                                    case 'vatNumber':
                                        checkInput('#p-profile-vat', err.error);
                                        errorShown = true;
                                        break;
                                    case 'name':
                                        checkInput('#p-profile-name', err.error);
                                        errorShown = true;
                                        break;
                                    case 'captcha':
                                        checkInput('#p-profile-captcha', err.error);
                                        errorShown = true;
                                        break;
                               }
                            }
                        });
                        if (!errorShown) {
                            $('#p-submit-error').show();
                        }
                    } else {
                        $('#p-submit-error').show();
                    }
                } else {
                    $('#p-submit-error').show();
                }
            },
            error: function(xhr, status, error) {
                setSubmitting(false);
                $('#p-submit-error').show();
            }
        });
    }

    var submittingContent = false;
    var submitNewContent = function() {
        if (submittingContent) { return; }

        var setSubmitting = function(submitting) {
            if (submitting) {
                $('#p-submit-error').hide();
                $('#p-action-submit').addClass('disabled');
                $('#p-action-submit span.p-action').text('Submitting');
                $('#p-action-submit img.arrow').attr('src', '/a/img/loading.gif');
            } else {
                $('#p-action-submit').removeClass('disabled');
                $('#p-action-submit span.p-action').text('Submit for publishing');
                $('#p-action-submit img.arrow').attr('src', '/a/img/blue-circle-arrow-r.png');
            }
        };

        setSubmitting(true);

        var req = {
            name: $('#p-app-name').val(),
            description: $('#p-app-description').val(),
            packageName: $('.p-apk-packagename').eq(0).text(),
            category: $('#p-app-category').val(),
            keywords: $('#p-app-keywords').val(),
            supportEmail: $('#p-app-email').val(),
            supportWebsite: $('#p-app-web').val(),
            legalHasEncryption: ($('#p-r-ei-yes').is(':checked') ? 1 : 0),
            legalHasEncryptionForDataProtection: (($('#p-r-ei-yes').is(':checked') && $('#p-r-et-no').is(':checked')) ? 1 : 0),
            legalRightToDistribute: ($('#p-app-encryption-dist').is(':checked') ? 1 : 0),
            apkFileName: $('.p-apk-filename').eq(0).text(),
            iconFileName: $('div.p-i-icon div.p-i-image img').attr('data-filename'),
            screenshot1FileName: $('div.p-i-screenshot[data-i-index=1] div.p-i-image img').attr('data-filename'),
            screenshot2FileName: $('div.p-i-screenshot[data-i-index=2] div.p-i-image img').attr('data-filename'),
            personalDataSources: ($('#p-r-p-data-yes').is(':checked') ? 1 : 0),
            personalInfo: ($('#p-r-p-info-yes').is(':checked') ? 1 : 0),
        };

        var ar = [];
        $('input[name^=p-ar-q-]:checked').each(function() {
            ar.push({
                question_id: $(this).attr('data-p-qid'),
                answer_id: $(this).val()
            });
        });
        req.ageRating = ar;

        if ($('#p-r-cs-select').is(':checked')) {
            req.countries = [];
            $('#p-c-l li span').each(function() {
                req.countries.push($(this).attr('id').replace(/c_id_/,''));
            });
        }

        $('#p-submit-error label.error').text('There was a problem submitting your request. Please try again later or contact support.');
        $.ajax({
            type: 'POST',
            url: '?ACT=' + $('#p-action-id').text() + "&___=create_content",
            data: JSON.stringify(req),
            contentType: 'text/plain',
            success: function(data) {
                setSubmitting(false);
                var r = null;
                try {
                    r = data.responseJSON || $.parseJSON(data);
                } catch(e) {
                }
                if (r) {
                    if (r.code === 0) {
                        p_warn_on_exit = false;
                        window.location.href = "/publish/submitted?v=" + Math.floor(((new Date).getTime() / 1000));
                    } else if (r.code === NPAERR_INVALID_INPUT) {
                        scrolled = false;
                        var checkInput = function(s, errText) {
                            var elem = $(s);
                            if (errText) { elem.nextAll('label.error').text(errText); }
                            elem.addClass('error');
                            scrollError(elem);
                        }
                        var errorShown = false;
                        $.each(r.data, function(idx, err) {
                            switch (err.field) {
                                case 'supportEmail':
                                    checkInput('#p-app-email');
                                    errorShown = true;
                                    break;
                                case 'name':
                                    checkInput('#p-app-name', err.error);
                                    errorShown = true;
                                    break;
                                case 'description':
                                    checkInput('#p-app-description', err.error);
                                    errorShown = true;
                                    break;
                                case 'packageName':
                                    $('#p-submit-error label.error').text(err.error);
                                    $('#p-submit-error').show();
                                    errorShown = true;
                                    break;


                           }
                        });
                        if (!errorShown) {
                            $('#p-submit-error').show();
                        }
                    } else {
                        $('#p-submit-error').show();
                    }
                } else {
                    $('#p-submit-error').show();
                }
            },
            error: function(xhr, status, error) {
                setSubmitting(false);
                $('#p-submit-error').show();
            }
        });
    }

// New app country selection
    $("#p-new-csearch").on("blur", function () {
        setTimeout(function() {
            $("#p-clist").empty();
        }, 300);
    });

    var addCountry = function(id, name) {
        var newCountry = $("<li></li>").append($("<span></span>").attr('id', 'c_id_' + id).text(name)).append($("<a></a>").append("<i></i>").click(function(e) {
            $(this).parent().remove();
        })).appendTo($("#p-c-l"));
        $('#p-c-l').removeClass('error');
    };

    $("#p-new-csearch").on("keyup click input", function () {
        var countries = p_countries || [];
        var matches = [];
        var val = $("#p-new-csearch").val().toLowerCase();
        var list = $("#p-clist");

        $.each(countries, function(idx, c) {
            if (val.length == 0 || c.name.toLowerCase().indexOf(val) != -1) {
                matches.push({id:c.id, name:c.name});
            }
        });

        list.empty();
        $.each(matches, function(idx, m) {
            var litem = $("<li>");
            var link;

            var cname = m.name;
            var cid = m.id;

            var exists = false;
            $("#p-c-l li span").each(function(idx, name) {
                if ($(this).text() == cname) {
                    exists = true;
                    return false;
                }
            });

            if (exists) {
                link = $("<span></span>").addClass('p-new-c-disabled');
            } else {
                link = $("<a>").data('id', cid).data('name', cname).click(function(e) {
                    addCountry($(this).data('id'), $(this).data('name'));
                });
            }

            if (val.length > 0) {
                var indices = [];
                var result;
                var re = new RegExp(val, 'ig');
                while ( (result = re.exec(cname)) ) {
                    indices.push(result.index);
                }
                while (indices.length > 0) {
                    var i = indices.pop();
                    cname = [cname.slice(0, i), '<b>', cname.slice(i, i + val.length), '</b>', cname.slice(i + val.length)].join('');
                }
            }

            link.html(cname).appendTo(litem);
            litem.appendTo(list);
        });
    });

    $('#p-c-link-default').on('click', function(e) {
        e.preventDefault();
        populateCountries();
    });

    $('#p-c-link-clear').on('click', function(e) {
        e.preventDefault();
        $('#p-c-l').empty();
    });

// Image and APK file upload
    var sizeString = function(bytes) {
        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
        do {
            bytes = bytes / 1024;
            i++;
        } while (bytes > 1024);

        return Math.max(bytes, 0.1).toFixed(1) + byteUnits[i];
    };

    var dateString = function(epoch) {
        var date = new Date(epoch * 1000);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    };

    var hasPosted = false;
    var uploadxhr = null;

    var enableContinue = function(enable) {
        if (enable) {
            $('#p-action-continue').removeClass('disabled');
        } else {
            $('#p-action-continue').addClass('disabled');
        }
    };

    var asyncFileSupported = function() {
        var xhr = new XMLHttpRequest();
        return (window.FormData !== undefined) && (!! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload)));
    };

    $('.p-upload-apk-link').on('click', function() {
        $('.p-upload-s').removeClass('p-upload-s-uploading p-upload-s-uploaded p-upload-s-invalid').addClass('p-upload-s-none');
        enableContinue(false);
    });

    suggestedCountries = {};
    suggestedCountryNames = [];
    hasEnglishLocale = false;
    var populateCountries = function() {
        $('#p-c-l').empty();
        if (hasEnglishLocale) {
            $.each(p_countries, function(code, c) {
                addCountry(c.id, c.name);
            });
        } else {
            suggestedCountryNames.sort();
            $.each(suggestedCountryNames, function(idx, name) {
                addCountry(suggestedCountries[name], name);
            });
        }
    };

    var apkUploadResult = function(data) {
        var uS = $('.p-upload-s');

        $('#p-c-l').empty();

        var r = null;
        try {
            r = $.parseJSON(data);
        } catch (e) {
        }

        if (r && r.data && r.data.metadata) {
            try {
                $('.p-icon').attr('src', (r.data.metadata.appIcon.length > 32767) ? r.data.metadata.appIconUrl : r.data.metadata.appIcon);
                $('.p-apk-title').text(r.data.metadata.appLabel);
                $('.p-apk-filename').text(r.data.filename);
                $('.p-apk-size').text(sizeString(r.data.filesize));
                $('.p-apk-date').text(dateString(r.data.metadata.apkInfo.apkDate));
                $('.p-apk-packagename').text(r.data.metadata.appPkg.name);
                $('.p-apk-versioncode').text(r.data.metadata.appPkg.versionCode);
                $('.p-apk-versionname').text(r.data.metadata.appPkg.versionName);
            } catch (e) {
                $('.p-icon').attr('src', '');
                $('.p-apk-title').text('');
                $('.p-apk-filename').text('');
                $('.p-apk-size').text('');
                $('.p-apk-date').text('');
                $('.p-apk-packagename').text('');
                $('.p-apk-versioncode').text('');
                $('.p-apk-versionname').text('');
            }
        } else {
            $('.p-icon').attr('src', '');
            $('.p-apk-title').text('');
            $('.p-apk-filename').text('');
            $('.p-apk-size').text('');
            $('.p-apk-date').text('');
            $('.p-apk-packagename').text('');
            $('.p-apk-versioncode').text('');
            $('.p-apk-versionname').text('');
        }
        if (r && r.code === 0) {
            uS.removeClass('p-upload-s-none p-upload-s-uploading p-uploading-invalid').addClass('p-upload-s-uploaded');

            $('#p-action-continue').removeClass('disabled');

            var languages = r.data.metadata.appLocales;
            var langList = [];
            var cList = [];
            var hasEnglishLocale = false;
            suggestedCountries = {};
            suggestedCountryNames = [];

            var countryInfo = function(code) {
                var cInfo = null;
                try {
                    cInfo = p_countries[code] || p_countries[code.toUpperCase()] || [p_countries[code.toLowerCase()]];
                } catch (e) {
                }
                return cInfo;
            };

            for (var i = 0; i < languages.length; i++) {
                var matches = /^([^-_]*)[-_]?([^-_]*)?$/.exec(languages[i].toLowerCase());
                if (matches) {
                    var locale = languages[i];
                    var l = matches[1];
                    var c = matches[2];
                    var cI = countryInfo(c);

                    if (locale === 'en') {
                        hasEnglishLocale = true;
                    }

                    if (p_language_names[locale]) {
                        langList.push(p_language_names[locale]);
                    } else if (p_language_names[l]) {
                        langList.push(p_language_names[l] + (cI ? (' (' + cI.name + ')') : ''));
                    }

                    if (p_languages[locale]) {
                        $.each(p_languages[locale].c, function(idx, c) {
                            var cInfo = countryInfo(c);
                            if (cInfo && ($.inArray(cInfo.name, suggestedCountryNames) === -1)) {
                                suggestedCountries[cInfo.name] = cInfo.id;
                                suggestedCountryNames.push(cInfo.name);
                            }
                        });
                    } else if (cI && !$.inArray(cI.name, suggestedCountryNames)) {
                        suggestedCountries[cI.name] = cI.id;
                        suggestedCountryNames.push(cI.name);
                    }
                }
            }

            populateCountries();

            if (hasEnglishLocale) {
                $('input.p-new-c-radio[value=global]').click();
            } else {
                $('input.p-new-c-radio[value=select]').click();
            }

            $('.p-new-c-radio').trigger('change');

            langList.sort();
            var preText = "Based on the languages of your app";
            var postText = ", we recommend you distribute it in the following countries. Or you can add any other countries of your choice.";
            $('#p-new-lang-suggestion').text(preText + ((langList.length > 0) ? (' (' + langList.join(", ") + ')') : "") + postText);
            p_warn_on_exit = true;
        } else {
            $('div.p-issues div.p-issue').not(':first').remove();
            if (r && r.code === NPAERR_PACKAGE_NAME_EXIST) {
                if (r.data && r.data.metadata && r.data.metadata.appPkg && r.data.metadata.appPkg.name) {
                    $('#p-issue-reason').text('Package name \'' + r.data.metadata.appPkg.name + '\' already exists in the store');
                } else {
                    $('#p-issue-reason').text('Package name already exists in the store');
                }
                $('#p-issue-recommendation').text('Upload a new APK with a unique package name');
            } else if (r && (r.code === NPAERR_INVALID_FILE_TYPE)) {
                $('#p-issue-reason').text('Unable to process APK file or incompatible file uploaded');
                $('#p-issue-recommendation').text('Upload a valid APK file');
            } else if (r && r.code === NPAERR_FILE_TOO_BIG) {
                $('#p-issue-reason').text('APK file is too large');
                $('#p-issue-recommendation').text('Upload a new APK file within the size limits');
            } else if (r && r.code === NPAERR_INVALID_APK_FILE) {
                $('#p-issue-reason').text('Invalid APK uploaded');
                $('#p-issue-recommendation').text('Upload a valid APK file');
                var count = 2;
                if (r.data && r.data.errors) {
                    $.each(r.data.errors, function(idx, err) {
                        var iss = null;
                        var rec = null;
                        if (err === NPAERR_INVALID_APK_FILE_MANIFEST) {
                            iss = 'APK file manifest is invalid or missing';
                            rec = 'Upload a new APK with a valid manifest file';
                        } else if (err === NPAERR_INVALID_APK_FILE_VERSIONCODE) {
                            iss = 'APK version code is not numeric';
                            rec = 'Upload a new APK with a numeric version code';
                        } else if (err === NPAERR_INVALID_APK_FILE_IAPTYPE) {
                            iss = 'Invalid in-app purchase type';
                            rec = 'Upload a new APK file that doesn\'t use Nokia IAP';
                        }

                        if (iss !== null) {
                            var elem = $('<div></div>').addClass('p-issue');
                            elem.append($('<div></div>').addClass('p-issue-count').text(count + '.'));
                            var desc = $('<div></div>').addClass('p-issue-desc');
                            desc.append($('<div></div>').addClass('p-issue-heading').text('Incompatibility'));
                            desc.append($('<div></div>').addClass('p-t-grey p-t-small').text(iss));
                            desc.append($('<div></div>').addClass('p-issue-heading').text('Recommendation'));
                            desc.append($('<div></div>').addClass('p-t-grey p-t-small').text(rec));
                            elem.append(desc);
                            elem.insertAfter($('#p-issues div.p-issue:last-child'));
                            count++;
                        }
                    });
                }
            } else {
                $('#p-issue-reason').text('Unable to upload or process your APK file');
                $('#p-issue-recommendation').text('Please try again later');
            }
            uS.removeClass('p-upload-s-none p-upload-s-uploading').addClass('p-upload-s-invalid');
        }
    };

    $('.p-apk-input').on('change', function() {
        var uS = $('.p-upload-s');
        uS.removeClass('p-upload-s-none p-upload-s-uploaded').addClass('p-upload-s-uploading');

        var fileName = this.value.match(/[\\\/]?([^\\\/]*)$/)[1];

        $('.p-apk-name').text(fileName);

        if (asyncFileSupported()) {
            $('.p-pbar-indeterminate').hide();
            $('.p-pbar-bar').css('width', '0%');
            $('.p-pbar').show();

            var apk = this.files[0];

            var filedata = new FormData();
            filedata.append('file', apk);

            $.ajax({
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function(event) {
                        var percentComplete = 0;
                        if (event.lengthComputable) {
                            percentComplete = Math.floor((event.loaded / event.total) * 100);
                        }
                        $('.p-pbar-bar').css('width', percentComplete + '%');
                    }, false);
                    uploadxhr = xhr;
                    return xhr;
                },
                type: 'POST',
                url: '/?ACT=' + $('#p-action-id').text() + "&___=upload_apk",
                data: filedata,
                processData: false,
                contentType: false,
                success: function(data) {
                    apkUploadResult(data);
                },
                error: function(xhr, status, error) {
                    uS.removeClass('p-upload-s-uploading p-upload-s-uploaded').addClass('p-upload-s-none');
                }
            });
        } else {
            $('.p-pbar-bar').css('width', '100%');
            $('.p-pbar-indeterminate').show();
            $('.p-pbar').show();

            var file = $(this);

            var iframeId = 'p_ulapk_iframe' + (Math.random() * 1000);
            var iframe = $('<iframe />', {
                id: iframeId,
                name: iframeId,
                width: 0,
                height: 0,
                border: 0,
                frameBorder: 0,
                style: "width: 0, height: 0, border: none"
            });    
            
            var iframeLoaded = function() {
                if (hasPosted) {
                    if (iframe[0].contentDocument.body.textContent !== undefined) {
                        apkUploadResult(iframe[0].contentDocument.body.textContent);
                    } else if (iframe[0].contentDocument.body.innerText !== undefined) {
                        apkUploadResult(iframe[0].contentDocument.body.innerText);
                    } else {
                        apkUploadResult(null);
                    }

                    var fileParent = $('div.p-upload-button');
                    iframe.find('input').appendTo(fileParent);
                    iframe.remove();
                    hasPosted = false;
                    return;
                }

                var form = $('<form />', {
                    method: "POST",
                    target: iframeId,
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data",
                    action: '/?ACT=' + $('#p-action-id').text() + "&___=upload_apk",
                }).append(file).appendTo(iframe);
                hasPosted = true;
                form.submit();
            }; 
                    
            iframe.on('load', iframeLoaded).appendTo('body');      
            iframe.width(0).height(0);
        }
    });

    $('.p-i-input').on('change', function() {
        var pI = $(this).parent('.p-i');
        pI.removeClass('p-i-s-empty p-i-s-image p-i-s-error error').addClass('p-i-s-loading');
        pI.find('.p-i-image img').attr('src', '');

        var action = pI.attr('data-i-type');
        var index = pI.attr('data-i-index') || 0;
        var file = $(this);

        var iframeId = 'p_ul_iframe' + (Math.random() * 1000);
        var iframe = $('<iframe />', {
            id: iframeId,
            name: iframeId,
            width: 0,
            height: 0,
            border: 0,
            frameBorder: 0,
            style: "width: 0, height: 0, border: none"
        });    
        
        var iframeLoaded = function() {
            if (hasPosted) {
                var r = null;

                try {
                    if (iframe[0].contentDocument.body.textContent !== undefined) {
                        r = iframe[0].contentDocument.body.textContent;
                    } else if (iframe[0].contentDocument.body.innerText !== undefined) {
                        r = iframe[0].contentDocument.body.innerText;                   
                    }
                    r = JSON.parse(r);
                } catch(e) {
                    r = null;
                }
                
                if ((r !== null) && (r.code === 0) && r.data.metadata.image) {
                    pI.find('.p-i-image img').attr('src', r.data.metadata.image).attr('data-filename', r.data.filename);
                    pI.removeClass('p-i-s-empty p-i-s-loading p-i-s-error').addClass('p-i-s-image');
                } else {
                    if ((r !== null) && (r.code === NPAERR_INVALID_IMAGE_FILE)) {
                        pI.siblings('div.p-i-error').text('Unrecognized image format');
                    } else if ((r !== null) && (r.code === NPAERR_INVALID_FILE_TYPE)) {
                        pI.siblings('div.p-i-error').text('Unrecognized image format');
                    } else if ((r !== null) && (r.code === NPAERR_FILE_TOO_BIG)) {
                        pI.siblings('div.p-i-error').text('Image is too large');
                    } else if ((r !== null) && (r.code === NPAERR_WRONG_IMAGE_SIZE)) {
                        pI.siblings('div.p-i-error').text('Invalid image dimensions');
                    } else {
                        pI.siblings('div.p-i-error').text('Invalid image or upload failed');
                    }
                    pI.removeClass('p-i-s-empty p-i-s-loading p-i-s-image').addClass('p-i-s-error');
                }

                iframe.find('input').appendTo(pI);
                iframe.remove();
                hasPosted = false;
                return;
            }

            var indexField = $('<input type="hidden" name="index">').attr('value', index);
            var form = $('<form />', {
                method: "POST",
                target: iframeId,
                encoding: "multipart/form-data",
                enctype: "multipart/form-data",
                action: '/?ACT=' + $('#p-action-id').text() + "&___=upload_" + action,
            }).append(file).append(indexField).appendTo(iframe);
            hasPosted = true;
            form.submit();
        }; 
                
        iframe.on('load', iframeLoaded).appendTo('body');      
        iframe.width(0).height(0);
    });
});
//  -----------------------------------------------
